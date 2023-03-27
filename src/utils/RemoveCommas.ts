export function removeCommas(val: string): Number {
  return Number(val.split(",").join(""));
}
