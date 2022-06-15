import axios from 'axios';
import qs from 'qs';
import { dispatch } from '../store';
import Config from '../constants/config';
import TokenManager from './tokenManager';

/**
 * Axios defaults
 */
axios.defaults.baseURL = Config.apiBaseUrl;
// axios.defaults.withCredentials = true;

// Headers
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

/**
 * Request Interceptor
 */
axios.interceptors.request.use(
  async (inputConfig) => {
    const config = inputConfig;
    try {
      const { access_token } = TokenManager.getToken();

      if (access_token && access_token !== 'undefined') {
        config.headers.common.Authorization = `Bearer ${access_token}`;
      }
    } catch (error) {
      /* Nothing */
    }

    return config;
  },
  (error) => {
    throw error;
  },
);

/**
 * Response Interceptor
 */
axios.interceptors.response.use(
  (res) => {
    // Status code isn't a success code - throw error
    if (!`${res?.status}`.startsWith('2')) {
      throw res.data;
    }

    // Otherwise just return the data
    if (res.data && typeof res.data === 'object') {
      res.data.timeStamp = Date.now();
    }

    return res;
  },

  async (error) => {
    if (error?.response?.status === 401 && error?.response?.config?.url !== Config.authUrl) {
      const { refresh_token } = TokenManager.getToken();
      const formData = {
        refresh_token,
        grant_type: 'refresh_token',
        client_id: 'admin-panel',
      };
      const options = {
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(formData),
        url: Config.authUrl,
      };
      await axios(options)
        .then(({ data }) => {
          TokenManager.setToken(data?.access_token, data?.refresh_token);
          axios.defaults.headers.common.Authorization = `Bearer ${data?.access_token}`;
        })
        .catch((err) => {
          if (err.response?.status === 401 || err.response?.status === 400) {
            TokenManager.removeToken();
          } else {
            dispatch.util.sendAlert({
              snackbarMessage: 'مشکلی پیش آمده ! دوباره تلاش کنید',
              snackbarOpen: true,
              snackBarSeverity: 'warning',
            });
          }
        });
    }
    throw error;
  },
);

export default axios;
