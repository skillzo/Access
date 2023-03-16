export const formatNumber = (val: number) => {
  const locale = navigator.language;
  return new Intl.NumberFormat(locale).format(val);
};
