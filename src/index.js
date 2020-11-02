import "./scss/index.scss";
import { Excel } from "./Components/excel/Excel";
import { Header } from "./Components/header/Header";
import { Formula } from "./Components/formula/Formula";
import { Tollbar } from "./Components/toolbar/Tollbar";
import { Table } from "./Components/table/Table";

const excel = new Excel("#app", {
  components: [Header, Tollbar, Formula, Table],
});
excel.render()

// console.log("Excel", excel);
