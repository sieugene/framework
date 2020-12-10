export const parse = (value = "") => {
  if (value.startsWith && value.startsWith("=")) {
    try {
      const res = eval(value.slice(1));
      return res;
    } catch (e) {
      return value;
    }
  }
  return value;
};
