import { createToolbar } from "./Toolbar.template";
import { $ } from "./../../core/dom";
import { Component } from "./../../core/Component";
export class Tollbar extends Component {
  static className = "excel__toolbar";
  constructor($root, options) {
    super($root, {
      name: "toolbar",
      listeners: ["click"],
      ...options,
    });
  }
  prepare() {
    const initialState = {
      textAlign: "left",
      fontWeight: "normal",
      textDecoration: "none",
      fontStyle: "normal",
    };
    this.initState(initialState);
  }
  get template() {
    return createToolbar(this.state);
  }
  toHTML() {
    return this.template;
  }
  onClick(event) {
    const $target = $(event.target);
    $target.addClass("active");
    if ($target.data.type === "button") {
      const value = JSON.parse($target.data.value);
      const key = Object.keys(value)[0];
      this.setState({
        [key]: value[key],
      });
    }
  }
}
