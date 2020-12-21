export const capitalize = (string) => {
  if (typeof string !== "string") {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const range = (start, end) => {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill("").map((_, index) => start + index);
};

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export const isEqual = (a, b) => {
  if (typeof a === "object" && typeof b === "object") {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
};

export const camelInDashed = (camel) => {
  return camel && camel.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
};

export const toInlineStyles = (styles = {}) => {
  return Object.keys(styles)
    .map((key) => `${key}: ${styles[key]}`)
    .join(";");
};

export const debounce = (fn, wait) => {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      // fn(...args);
      //apply for bind this
      //eslint-disable-next-line
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const preventDefault = (event) => {
  event.preventDefault();
};
