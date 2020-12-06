import { createToolbar } from "./Toolbar.template";
import { $ } from "./../../core/dom";
import { Component } from "./../../core/Component";
import { defaultStyles } from "./../../constants";
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
    this.initState(defaultStyles);
  }
  get template() {
    return createToolbar(this.state);
  }
  toHTML() {
    return this.template;
  }
  onClick(event) {
    const $target = $(event.target);
    // $target.addClass("active");
    if ($target.data.type === "button") {
      const value = JSON.parse($target.data.value);
      const key = Object.keys(value)[0];
      this.$emit("tollbar:applyStyle", value);
      this.setState({
        [key]: value[key],
      });
    }
  }
}
