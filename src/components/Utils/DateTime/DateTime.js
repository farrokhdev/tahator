/* eslint-disable */
const DateTime = {

  monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  weekNames: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],

  JalaliDate: {
    g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
  },

  getJalaliMonthFirstWeekDay(y, m, d) {
    const kabisCount = Math.floor((y - 1392) / 4);
    const newDay = (y - 1392 + kabisCount + 5) % 7;

    return (31 * (m - 1) + (m - 7 > 0 ? 7 - m : 0) + newDay + d - 1) % 7;
  },
  jalaliToGregorian(j_y, j_m, j_d) {
    j_y = parseInt(j_y);
    j_m = parseInt(j_m);
    j_d = parseInt(j_d);
    const jy = j_y - 979;
    const jm = j_m - 1;
    const jd = j_d - 1;

    let j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
    for (var i = 0; i < jm; ++i) j_day_no += this.JalaliDate.j_days_in_month[i];

    j_day_no += jd;

    let g_day_no = j_day_no + 79;

    let gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
    g_day_no %= 146097;

    let leap = true;
    if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */
    {
      g_day_no--;
      gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
      g_day_no %= 36524;

      if (g_day_no >= 365) g_day_no++;
      else leap = false;
    }

    gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
    g_day_no %= 1461;

    if (g_day_no >= 366) {
      leap = false;

      g_day_no--;
      gy += parseInt(g_day_no / 365);
      g_day_no %= 365;
    }

    for (var i = 0; g_day_no >= this.JalaliDate.g_days_in_month[i] + (i === 1 && leap); i++) g_day_no -= this.JalaliDate.g_days_in_month[i] + (i === 1 && leap);
    let gm = i + 1;
    let gd = g_day_no + 1;

    gm = gm < 10 ? `0${ gm}` : gm;

    gd = gd < 10 ? `0${ gd}` : gd;

    return [gy, gm, gd];
  },

  gregorianToJalali(g_y, g_m, g_d) {
    const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    const gy = g_y - 1600;
    const gm = g_m - 1;
    const gd = g_d - 1;

    let g_day_no = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);

    for (let i = 0; i < gm; ++i) g_day_no += g_days_in_month[i];
    if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)))
    /* leap and after Feb */
    { ++g_day_no; }
    g_day_no += gd;

    let j_day_no = g_day_no - 79;

    const j_np = Math.floor(j_day_no / 12053);
    j_day_no %= 12053;

    let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);

    j_day_no %= 1461;

    if (j_day_no >= 366) {
      jy += Math.floor((j_day_no - 1) / 365);
      j_day_no = (j_day_no - 1) % 365;
    }

    for (var i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i) {
      j_day_no -= j_days_in_month[i];
    }
    const jm = i + 1;
    const jd = j_day_no + 1;

    return { day: jd, month: jm, year: jy};
  },
  dateToTime(dateTime) {
    const [date, time] = dateTime.split('T');
    const sp1 = date.split('-').map((v) => parseInt(v));
    const sp2 = time ? time.split('.')[0].split(':').map((v) => parseInt(v)) : [0, 0, 0];
    return { hour: sp2[0], minute: sp2[1].toString().length === 1 ? `${sp2[1] }0` : sp2[1], second: sp2[2] };
  },
  stringToDate(dateTime) {
    const [date, time] = dateTime.split('T');
    const sp1 = date.split('-').map((v) => parseInt(v));
    const sp2 = time ? time.split('.')[0].split(':').map((v) => parseInt(v)) : [0, 0, 0];
    return { year: sp1[0], month: sp1[1], day: sp1[2], hour: sp2[0], minute: sp2[1], second: sp2[2] };
  },

};

export default DateTime;
