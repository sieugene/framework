import { ExcelComponent } from "./../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from "./../../core/dom";
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
  onMousedown(event) {
    // console.log(event.target.getAttribute('data-resize'));
    if (event.target.dataset.resize) {
      console.log("start resizig", event.target.dataset.resize);
      const $resizer = $(event.target);
      // const $parent = $resizer.$el.parentNode; //bad
      //const $parent = $resizer.$el.closest('.column') //better but bad
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();

      document.onmousemove = (e) => {
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;
        $parent.$el.style.width = `${value}px`;
      };
      document.onmouseup = () => {
        //очистка события
        document.onmousemove = null;
      };
    }
  }
}
