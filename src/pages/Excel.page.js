import { Page } from "./../core/Page";
import { debounce, storage } from "./../core/Utils";
import { createStore } from "./../core/createStore";
import { rootReducer } from "./../store/rootReducer";
import { initialState } from "./../store/initialState";
import { Header } from "./../Components/header/Header";
import { Tollbar } from "./../Components/toolbar/Tollbar";
import { Formula } from "./../Components/formula/Formula";
import { Table } from "./../Components/table/Table";
import { Excel } from "./../Components/excel/Excel";

export class ExcelPage extends Page {
  getRoot() {
    const store = createStore(rootReducer, initialState);
    const stateListener = debounce((state) => {
      console.log("%c App State! ", "background: #222; color: #bada55", state);
      storage("excel-state", state);
    }, 300);
    store.subscribe(stateListener);
    this.excel = new Excel({
      components: [Header, Tollbar, Formula, Table],
      store,
    });
    return this.excel.getRoot();
  }
  afterRender() {
    this.excel.init();
  }
  destroy() {
    this.excel.destroy();
  }
}
