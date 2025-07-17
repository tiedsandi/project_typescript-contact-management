import CreateContactPage from "./pages/CraeteContactPage";
import DashboardPage from "./pages/DashboardPage";
import { action as createContactAction } from "./actions/createContactAction";
import { loader as dashboardLoader } from "./loaders/dashboardContactLoader";

export {
  DashboardPage,
  CreateContactPage,
  dashboardLoader,
  createContactAction,
};
