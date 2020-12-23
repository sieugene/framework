import { rootReducer } from "./../store/rootReducer";
import { normalizeInitialState } from "./../store/initialState";
import { Header } from "./../Components/header/Header";
import { Tollbar } from "./../Components/toolbar/Tollbar";
import { Formula } from "./../Components/formula/Formula";
import { Table } from "./../Components/table/Table";
import { Excel } from "./../Components/excel/Excel";
import { createStore } from "./../core/store/createStore";
import { StateProcessor } from "./../core/page/StateProcessor";
import { Page } from "./../core/page/Page";
import { LocalStorageClient } from "../shared/LocalStorageClient";

export class ExcelPage extends Page {
  constructor(param) {
    super(param);
    this.storeSub = null;
    this.processor = new StateProcessor(new LocalStorageClient(this.params));
  }
  async getRoot() {
    const state = await this.processor.get();
    const initialState = normalizeInitialState(state);
    const store = createStore(rootReducer, initialState);

    this.storeSub = store.subscribe(this.processor.listen);

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
    this.storeSub.unsubscribe();
  }
}
