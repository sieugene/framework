import { $ } from "@core/dom";
import { ActiveRoute } from "./ActiveRoute";

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw Error("Selector is not provided in Router");
    }
    this.$placeholder = $(selector);
    this.routes = routes;
    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }
  init() {
    window.addEventListener("hashchange", this.changePageHandler);
    this.changePageHandler();
  }
  changePageHandler(event) {
      debugger
    this.$placeholder.html(
      `<h1>test${ActiveRoute.path}</h1>`,
      ActiveRoute.path
    );
  }
  destroy() {
    window.removeEventListener("hashchange", this.changePageHandler);
  }
}