import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  // Возвращает шаблон компонента
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    
    this.emitter = options.emitter.emitter;

    this.prepare();
  }
  prepare() {}
  toHTML() {
    return "";
  }
  init() {
    this.initDOMListeners();
  }
  destroy() {
    this.removeDOMListeners();
  }
}
