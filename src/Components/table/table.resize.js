import { $ } from "../../core/dom";

export const resizer = ($root, event) => {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const type = event.target.dataset.resize;
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const isCol = type === "col" ? true : false;
    let value;
    $resizer.css({
      opacity: 1,
      [isCol ? "bottom" : "right"]: "-5000px",
    });
    const changeSize = (e) => {
      const delta = isCol ? e.pageX - coords.right : e.pageY - coords.bottom;
      value = isCol ? coords.width + delta : coords.height + delta;
      $resizer.css({
        [isCol ? "right" : "bottom"]: -delta + "px",
      });
    };
    document.onmousemove = (e) => {
      changeSize(e);
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
        $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((el) => (el.style.width = value + "px"));
      } else if (type === "row") {
        $parent.css({
          height: `${value}px`,
        });
      }
      resolve({
        value,
        type,
        id: $parent.data[type],
      });
    };
  });
};
