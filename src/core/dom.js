class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }
  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }
  clear() {
    this.html("");
    return this;
  }
  on(eventType, callBack) {
    this.$el.addEventListener(eventType, callBack);
  }
  off(eventType, callBack) {
    this.$el.removeEventListener(eventType, callBack);
  }
  find(selector) {
    return $(this.$el.querySelector(selector));
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }
  get data() {
    return this.$el.dataset;
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }
  closest(selector) {
    return $(this.$el.closest(selector));
  }
  getCoords() {
    return this.$el.getBoundingClientRect();
  }
  css(styles) {
    return Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
  }
  addClass(className) {
    this.$el.classList.add(className);
  }
  removeClass(className) {
    this.$el.classList.remove(className);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName);
  if (classes && classes !== "") {
    el.classList.add(classes);
  }
  return $(el);
};
