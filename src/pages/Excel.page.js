import { Page } from "./../core/Page";
import { debounce, storage } from "./../core/Utils";
import { rootReducer } from "./../store/rootReducer";
import { normalizeInitialState } from "./../store/initialState";
import { Header } from "./../Components/header/Header";
import { Tollbar } from "./../Components/toolbar/Tollbar";
import { Formula } from "./../Components/formula/Formula";
import { Table } from "./../Components/table/Table";
import { Excel } from "./../Components/excel/Excel";
import { createStore } from "./../core/store/createStore";

function storageName(param = "") {
  return "excel" + param;
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const state = storage(storageName(this.params));
    const store = createStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce((state) => {
      storage(storageName(params), state);
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
