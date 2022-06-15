import config from '../constants/config';

const wrapper = (fn, errorHandler, sendAlert) => {
  return fn()
    .then((res) => {
      if (res && config.isDevEnv) {
        console.log({ url: res?.config?.url, res });
      }
      if (sendAlert) {
        sendAlert({
          snackbarMessage: 'عملیات با موفقیت انجام شد',
          snackbarOpen: true,
          snackBarSeverity: 'success',
        });
      }

      return res;
    })
    .catch((error) => {
      if (config.isDevEnv) {
        console.log('error.response', error.response);
      }
      if (error?.response?.status === 401 && error.response.config.url !== config.authUrl) {
        return wrapper(fn, errorHandler, sendAlert);
      }
      errorHandler?.(error);
      throw error;
    });
};

export default wrapper;
