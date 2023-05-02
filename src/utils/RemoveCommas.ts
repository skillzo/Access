export function removeCommas(val: string): number {
  return Number(val.split(",").join(""));
}
