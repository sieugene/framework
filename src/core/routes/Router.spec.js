import { Router } from "./Router";
import { Page } from "./../Page";

class DashBoardPage extends Page {
  $root = document.createElement("div");
  param = "test";

  getRoot() {
    this.$root.innerHTML = "dashboard";
    return this.$root;
  }
  destroy() {
    this.param = undefined;
  }
}
class ExcelPage extends Page {
  $root = document.createElement("div");

  getRoot() {
    this.$root.innerHTML = "testing";
    return this.$root;
  }
  destroy() {
    this.$root.innerHTML = "";
  }
}

describe("Router", () => {
  let router;
  let $root;
  beforeEach(() => {
    $root = document.createElement("div");
    router = new Router($root, {
      dashboard: DashBoardPage,
      excel: ExcelPage,
    });
  });
  test("should be defined", () => {
    expect(router).toBeDefined();
  });

  test("should render Dashboard Page", () => {
    router.init();
    expect($root.innerHTML).toBe("<div>dashboard</div>");
  });

  test("should destroy Dashboard Page when page change on Excel Page", () => {
    router.init();
    expect(router.page.param).toBe("test");
    window.location.hash = "#excel";
    router.changePageHandler();
    expect(router.page.param).toBe(undefined);
    expect($root.innerHTML).toBe("<div>testing</div>");
  });
});
