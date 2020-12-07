import { ExcelComponent } from "./../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizer } from "./table.resize";
import { isCell, matrix, shouldResize, nextSelector } from "./table.functions";
import { TableSelection } from "./TableSelection";
import { $ } from "../../core/dom";
import * as actions from "./../../store/actions";
import { defaultStyles } from "./../../constants";

export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
  }
  toHTML() {
    const colState = this.store.getState();
    return createTable(20, colState);
  }
  prepare() {
    console.log("prepare");
    this.selection = new TableSelection();
  }
  init() {
    console.log("init");
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on("formula:input", (text) => {
      this.selection.current.text(text);
      this.updateTextInStore(text);
      console.log("table from formula", text);
    });
    this.$on("formula:done", () => {
      if (focus) {
        this.selection.current.focus();
      }
    });
    this.$on("tollbar:applyStyle", (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.selection.selectedIds,
        })
      );
    });
  }
  selectCell($cell) {
    this.selection.select($cell);
    this.$emit("table:select", $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    console.log("Styles to dispatch", styles);
    this.$dispatch(actions.changeStyles(styles));

    // this.$dispatch({ type: "TEST" });
  }

  async resizeTable(event) {
    try {
      const data = await resizer(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (error) {
      console.warn("RESIZE ERROR", error);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }
  onKeydown(event) {
    if (isCell(event)) {
      const keys = [
        "Enter",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "ArrowDown",
        "ArrowUp",
      ];
      const { key } = event;
      if (keys.includes(key) && !event.shiftKey) {
        event.preventDefault();
        const id = this.selection.current.id(true);
        const $next = this.$root.find(nextSelector(key, id));
        this.selectCell($next);
      }
    }
  }
  updateTextInStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value,
      })
    );
  }
  onInput(event) {
    this.updateTextInStore($(event.target).text());
    // this.$emit("table:input", $(event.target));
  }
}
