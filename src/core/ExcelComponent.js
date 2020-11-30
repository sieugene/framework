import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  // Возвращает шаблон компонента
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.unsubscribers = [];
    this.store = options.store;
    this.$storeSub = null;
    this.emitter = options.emitter;
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
  $dispatch(action) {
    this.store.dispatch(action);
  }
  $subscribe(fn) {
    this.$storeSub = this.store.subscribe(fn);
    //sub.unsubscribe()
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
    this.$storeSub.unsubscribe();
  }
}
