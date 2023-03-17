export const addComma = (num: any) => {
  num.toString().replace(/[^0-9]/g, "");
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
