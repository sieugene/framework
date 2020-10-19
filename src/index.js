import "./scss/index.scss";
import { Excel } from "./Components/excel/Excel";

const excel = new Excel("#app", {
  components: [],
});

console.log("Excel", excel);
