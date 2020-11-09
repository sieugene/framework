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
    if (event.target.dataset.resize) {
      console.log("start resizig", event.target.dataset.resize);
      const $resizer = $(event.target);
      const type = event.target.dataset.resize;
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const ownProp = type === "col" ? "bottom" : "right";
      let value;
      $resizer.css({
        opacity: 1,
        [ownProp]: "-5000px",
      });

      document.onmousemove = (e) => {
        if (type === "col") {
          const delta = e.pageX - coords.right;
          value = coords.width + delta;
          $resizer.css({
            right: -delta + "px",
          });
        } else if (type === "row") {
          const delta = e.pageY - coords.bottom;
          value = coords.height + delta;
          $resizer.css({
            bottom: `${-delta}px`,
          });
        }
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        $resizer.css({
          opacity: 0,
          bottom: 0,
          right: 0,
        });
        if (type === "col") {
          this.$root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach((el) => (el.style.width = value + "px"));
        } else if (type === "row") {
          $parent.css({
            height: `${value}px`,
          });
        }
      };
    }
  }
}
