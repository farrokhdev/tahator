export const setCookie = (cookieName, cookieValue, expireInDays) => {
  const d = new Date();
  d.setTime(d.getTime() + (expireInDays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;

  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
};

export const getCookie = (cookieName) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cookieName}=`);

  if (parts.length === 2) return parts.pop().split(';').shift();
  return false;
};

export const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};
