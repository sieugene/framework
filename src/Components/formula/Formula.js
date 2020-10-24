import { ExcelComponent } from "./../../core/ExcelComponent";
export class Formula extends ExcelComponent {
  static className = "excel__formula";
  //перетираем родительский метод
  toHTML() {
    return ` <div class="info">fx</div>
    <div class="input" contenteditable spellcheck="false"></div>`;
  }
}
