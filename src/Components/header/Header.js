import { ExcelComponent } from "./../../core/ExcelComponent";
import { $ } from "./../../core/dom";
import { changeTitle } from "../../store/actions";
import { defaultTitle } from "./../../constants";
export class Header extends ExcelComponent {
  static className = "excel__header";
  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input"],
      ...options,
    });
  }
  onInput(event) {
    const $target = $(event.target);
    const value = $target.$el.value;

    this.$dispatch(changeTitle(value));
  }
  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `<input value="${title}" class="input" type="text" />
    <div>
      <div class="button">
        <span class="material-icons"> delete </span>
      </div>
      <div class="button">
        <span class="material-icons"> exit_to_app </span>
      </div>
    </div>`;
  }
}
