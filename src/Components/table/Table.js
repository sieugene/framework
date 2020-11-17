import { ExcelComponent } from "./../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizer } from "./table.resize";
import { isCell, shouldResize } from "./table.functions";
import { TableSelection } from "./TableSelection";
import { $ } from "../../core/dom";
export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root) {
    super($root, {
      listeners: ["mousedown"],
    });
  }
  toHTML() {
    return createTable(20);
  }
  prepare() {
    console.log("prepare");
    this.selection = new TableSelection();
  }
  init() {
    console.log("init");
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizer(this.$root, event);
    } else if (isCell(event)) {
      console.log(event.shiftKey);
      const select = event.target.dataset.id;
      if (select) {
        const $target = $(event.target);
        this.selection.select($target);
      }
    }
  }
}
