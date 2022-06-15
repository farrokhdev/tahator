/* eslint-disable no-restricted-properties */
import DateTime from '../components/Utils/DateTime/DateTime';

export const phoneRegExp = /^(\98|0)?9\d{9}$/;

export const changeJalaliFormat = (birthday: string) => {
  const yearSlice = birthday?.slice(0, 4);
  const monthSlice = birthday?.slice(4, 6);
  const daySlice = birthday?.slice(6, 8);
  return birthday ? `${yearSlice}/${monthSlice}/${daySlice}` : null;
};

export const computeDateInJalaliFormat = (createdAt: string) => {
  if (createdAt) {
    const createAtDate = DateTime.stringToDate(createdAt);
    const createAtJalaliDate = DateTime.gregorianToJalali(createAtDate.year, createAtDate.month, createAtDate.day);
    const weekDayNumber =
      DateTime.getJalaliMonthFirstWeekDay(createAtJalaliDate.year, createAtJalaliDate.month, createAtJalaliDate.day);
    return `${DateTime.weekNames[weekDayNumber]} ${createAtJalaliDate.day}
             ${DateTime.monthNames[createAtJalaliDate.month - 1]}`;
  }
};
export const removeParameterFromUrl = (url: string, parameter: string) => {
  return url
    .replace(new RegExp(`[?&]${ parameter }=[^&#]*(#.*)?$`), '$1')
    .replace(new RegExp(`([?&])${ parameter }=[^&]*&`), '$1');
};

export const computeOnlyDateInJalali = (createdAt: string) => {
  if (createdAt) {
    const createAtDate = DateTime.stringToDate(createdAt);
    const createAtJalaliDate = DateTime.gregorianToJalali(createAtDate.year, createAtDate.month, createAtDate.day);
    return `${createAtJalaliDate.year}/${createAtJalaliDate.month}/${createAtJalaliDate.day}`;
  }
};

export const computeCustomDateWithTime = (createdAt: string) => {
  if (createdAt) {
    const createAtDate = DateTime.stringToDate(createdAt);
    const createAtJalaliDate = DateTime.gregorianToJalali(createAtDate.year, createAtDate.month, createAtDate.day);

    const hour = createAtDate.hour.toString().length === 1 ? `0${createAtDate.hour}` : createAtDate.hour;
    const minute = createAtDate.minute.toString().length === 1 ? `0${createAtDate.minute}` : createAtDate.minute;
    return {
      date: `${createAtJalaliDate.year}/${createAtJalaliDate.month}/${createAtJalaliDate.day}`,
      time: `${hour}:${minute}`,
    };
  }
};

export const computeTimeInJalaliFormat = (createdAt: string) => {
  if (createdAt) {
    const createAtDate = DateTime.stringToDate(createdAt);
    return `${createAtDate.hour}:${createAtDate.minute}:${createAtDate.second}`;
  }
};

export const convertFormatDate = (date: string) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return `${[year, month, day].join('-')}T00:00:00.343Z`;
};

export const commaSeparateNumber = (val: any) => {
  if (val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
      // eslint-disable-next-line no-param-reassign,no-useless-concat
      val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
  }
  return val;
};

export const timeFormatter = (currentTime: any, separator: string, locale: string) => {
  const options = [{ weekday: 'long' }, { day: 'numeric' }, { month: 'short' }, { year: 'numeric' }];

  function format(m: any) {
    const f = new Intl.DateTimeFormat(locale, m);
    return f.format(currentTime);
  }
  return options.map(format).join(separator);
};

export const dateTimeFormatter = (locale: string) => {
  const formatTime = timeFormatter(new Date(), ' ', locale);
  const day = formatTime.substr(0, formatTime.indexOf(' '));
  const formattedDateTime = (day).concat(`،${formatTime.split(day)[1]}`);
  return formattedDateTime;
  // const formattedGregorian = timeFormatter(new Date(), ' ', 'en');
};

const formatTime = (value: number) => `${value.toString().length === 1 ? '01' : value}`;

export const computeDateInJalali = (createdAt: string) => {
  if (createdAt) {
    const createAtDate = DateTime.stringToDate(createdAt);
    const createAtJalaliDate = DateTime.gregorianToJalali(createAtDate.year, createAtDate.month, createAtDate.day);
    return `${createAtJalaliDate.year}/${createAtJalaliDate.month}/${createAtJalaliDate.day}`;
  }
};

export const getCurrentTime = () => {
  const today = new Date();
  return `${formatTime(today.getHours())}:${formatTime(today.getMinutes())}:${formatTime(today.getSeconds())}`;
};

export const convertNumbers2English = (string: any) => {
  return string.replace(/[\u0660-\u0669]/g, (c: any) => {
    return c.charCodeAt(0) - 0x0660;
  }).replace(/[\u06f0-\u06f9]/g, (c: any) => {
    return c.charCodeAt(0) - 0x06f0;
  });
};

export const copyToClipboard = (value: any) => {
  const input = document.createElement('textarea');
  input.innerHTML = value;
  document.body.appendChild(input);
  input.select();
  const result = document.execCommand('copy');
  document.body.removeChild(input);
  return result;
};

export const isObjectEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export const convertDateTime = (dateTime: string) => {
  const date = new Date(dateTime).toLocaleString('fa');
  return date.replace('،', ' -');
};

export const toFixed = (x: any, y: number) => {
  return Number.parseFloat(x).toFixed(y);
};
