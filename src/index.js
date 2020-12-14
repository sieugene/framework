import "./scss/index.scss";
import { Router } from "./core/routes/Router";
import { DashboardPage } from "./pages/Dashboard.page";
import { ExcelPage } from "./pages/Excel.page";

new Router("#app", {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
