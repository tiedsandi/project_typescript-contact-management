import CreateContactPage from "./pages/CreateContactPage";
import DashboardPage from "./pages/DashboardPage";
import UpdateContactPage from "./pages/UpdateContactPage";
import { action as createContactAction } from "./actions/createContactAction";
import { loader as dashboardLoader } from "./loaders/dashboardContactLoader";
import { action as updateContactAction } from "./actions/updateContactAction";
import { loader as updateContactLoader } from "./loaders/updateContactLoader";

export {
  UpdateContactPage,
  DashboardPage,
  CreateContactPage,
  dashboardLoader,
  updateContactLoader,
  createContactAction,
  updateContactAction,
};
