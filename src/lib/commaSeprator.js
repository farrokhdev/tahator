export const commaSeparateNumber = (val) => {
  if (val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
      // eslint-disable-next-line no-param-reassign,no-useless-concat
      val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
    }
  }
  return val;
};
