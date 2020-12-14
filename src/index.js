import "./scss/index.scss";
// import { Excel } from "./Components/excel/Excel";
// import { Header } from "./Components/header/Header";
// import { Formula } from "./Components/formula/Formula";
// import { Tollbar } from "./Components/toolbar/Tollbar";
// import { Table } from "./Components/table/Table";
// import { createStore } from "./core/createStore";
// import { rootReducer } from "./store/rootReducer";
// import { storage, debounce } from "./core/Utils";
// import { initialState } from "./store/initialState";
import { Router } from "./core/routes/Router";

// const store = createStore(rootReducer, initialState);
new Router("#app", {});

// const stateListener = debounce((state) => {
//   console.log("%c App State! ", "background: #222; color: #bada55", state);
//   storage("excel-state", state);
// }, 300);

// store.subscribe(stateListener);

// const excel = new Excel("#app", {
//   components: [Header, Tollbar, Formula, Table],
//   store,
// });
// excel.render();

// console.log("Excel", excel);
