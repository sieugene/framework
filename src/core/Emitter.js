export class Emitter {
  constructor() {
    this.listeners = {};
  }
  //Уведомление слушателей если они есть
  //table.emit('table:select', {a:1}
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    } else {
      this.listeners[event].forEach((listener) => {
        listener(...args);
      });
    }
  }

  //Подписка на уведомления(добавление нового слушателя)
  //formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    //отписка
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        //замыкаем
        (listener) => listener !== fn
      );
    };
  }
}

// const emitter = new Emitter();

// //подписываемся
// const unsub = emitter.subscribe("test", (data) => console.log("sub", data));
// //название события и аргументы
// emitter.emit("test", 42);

// setTimeout(() => {
//   emitter.emit("test", "after 2 sec");
// }, 2000);

// setTimeout(() => {
//   //отписка
//   unsub();
// }, 3000);

// setTimeout(() => {
//   emitter.emit("test", "after 4 sec");
// }, 4000);
