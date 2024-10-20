export const joinWithHyphen = (str: string) => {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
