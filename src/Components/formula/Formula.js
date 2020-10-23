import { ExcelComponent } from "./../../core/ExcelComponent";
export class Formula extends ExcelComponent {
  //перетираем родительский метод
  toHTML() {
    return "<h1>Formula</h1>";
  }
}
