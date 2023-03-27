export const addComma = (val: string): string => {
  const separateByComma = (num: string) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const removeNonNumber = (num: string) =>
    num.toString().replace(/[^0-9]/g, "");
  return separateByComma(removeNonNumber(val));
};
