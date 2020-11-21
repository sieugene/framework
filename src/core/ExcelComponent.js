import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  // Возвращает шаблон компонента
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.unsubscribers = [];

    this.emitter = options.emitter.emitter;

    this.prepare();
  }
  //Настраивает наш компонент до init
  prepare() {}
  //Возвращает шаблон компонента
  toHTML() {
    return "";
  }
  //Уведомляем слушателей про события event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }
  //Подписка на события event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }
  //Инициализации компоненты
  //Добавляем DOM слушателей
  init() {
    this.initDOMListeners();
  }
  //Удаляем компонент
  //Чистим слушателей
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
