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
      const type = event.target.dataset.resize;
      // const $parent = $resizer.$el.parentNode; //bad
      //const $parent = $resizer.$el.closest('.column') //better but bad
      const $parent = $resizer.closest('[data-type="resizable"]');

      const coords = $parent.getCoords();
      //кэшируем заранее querySelectorAll, чтобы на евенте не вызывать
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);
      $parent.$el.classList.add("active");

      document.onmousemove = (e) => {
        if (type === "col") {
          const delta = e.pageX - coords.right;
          const value = coords.width + delta;
          $parent.css({
            width: `${value}px`,
          });
        } else if (type === "row") {
          const delta = e.pageY - coords.bottom;
          const value = coords.height + delta;
          $parent.css({
            height: `${value}px`,
          });
        }
        //more renderings in mouseEvent!
        //cells.forEach((el) => (el.style.width = value + "px"));
      };
      document.onmouseup = () => {
        //очистка события
        document.onmousemove = null;
        if (type === "col") {
          $parent.$el.classList.remove("active");
          cells.forEach(
            (el) => (el.style.width = $parent.$el.offsetWidth + "px")
          );
        } else if (type === "row") {
          $parent.$el.classList.remove("active");
        }
      };
    }
  }
}
