import React from "react";
import MaterialRequisitionForm from "./views/forms/MaterialRequisitionForm";
import TimeCards from "./views/forms/TimeCards";
import WorkOrder from "./views/forms/WorkOrder";
import CircuitDirectoryBusiness from "./views/forms/CircuitDirectoryBusiness";
import CircuitDirectoryHome from "./views/forms/CircuitDirectoryHome";
import CircuitDirectorySelector from "./views/forms/CircuitDirectorySelector";
import WorkOrdersCrud from "./views/crud/WorkOrdersCrud";
import TimeCardCrud from "./views/crud/TimeCardCrud";
import MaterialRequisitionCrud from "./views/crud/MaterialRequisitionCrud";
import SafetySheetsCrud from "./views/crud/SafetySheetsCrud";
import CircuitDirectoryCrud from "./views/crud/CircuitDirectoryCrud";
import SignSheet from "./views/forms/SignSheet";
import ListSheet from "./views/forms/ListSheet";
import SheetCreate from "./views/forms/SheetCreate";
import Jobs from "./views/forms/Jobs";
import JobsCrud from "./views/crud/JobsCrud";
import Profile from "./views/pages/profile/Profile";
import CircuitDirectoryBusiness208 from "./views/forms/CircuitDirectoryBusiness208";
import CircuitDirectoryBusiness480 from "./views/forms/CircuitDirectoryBusiness480";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));
const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  // Forms
  {
    path: "/timecards/create",
    exact: true,
    name: "Time Cards",
    component: TimeCards,
  },
  {
    path: "/work-order/create",
    exact: true,
    name: "Work Order",
    component: WorkOrder,
  },
  {
    path: "/safety-sheets/list",
    exact: true,
    name: "List Sheet",
    component: ListSheet,
  },
  {
    path: "/safety-sheets/sign/:idFile",
    exact: true,
    name: "Sign Sheet",
    component: SignSheet,
  },
  {
    path: "/safety-sheets/",
    exact: true,
    name: "Safety Sheets",
    component: SafetySheetsCrud,
  },
  {
    path: "/report/work-order",
    exact: true,
    name: "Report Work Order",
    component: WorkOrdersCrud,
  },
  {
    path: "/report/time-card",
    exact: true,
    name: "Time Cards",
    component: TimeCardCrud,
  },
  {
    path: "/report/material-requisition",
    exact: true,
    name: "Material Requisition",
    component: MaterialRequisitionCrud,
  },
  {
    path: "/report/circuit-directory",
    exact: true,
    name: "Circuit Directory",
    component: CircuitDirectoryCrud,
  },

  {
    path: "/material-requisition/create",
    exact: true,
    name: "Material Requisition Form",
    component: MaterialRequisitionForm,
  },
  {
    path: "/circuit-directory/selector",
    exact: true,
    name: "Circuit Directory Selector",
    component: CircuitDirectorySelector,
  },
  {
    path: "/circuit-directory-business/create",
    exact: true,
    name: "Circuit Directory Business",
    component: CircuitDirectoryBusiness,
  },
  {
    path: "/circuit-directory-business-208/create",
    exact: true,
    name: "Circuit Directory Business 208V",
    component: CircuitDirectoryBusiness208,
  },
  {
    path: "/circuit-directory-business-480/create",
    exact: true,
    name: "Circuit Directory Business 480V",
    component: CircuitDirectoryBusiness480,
  },
  {
    path: "/circuit-directory-home/create",
    exact: true,
    name: "Circuit Directory Home",
    component: CircuitDirectoryHome,
  },
  {
    path: "/sheet/create",
    exact: true,
    name: "Create Document",
    component: SheetCreate,
  },
  {
    path: "/profile",
    exact: true,
    name: "Profile",
    component: Profile,
  },
  {
    path: "/jobs/edition",
    exact: true,
    name: "Jobs Edit",
    component: JobsCrud,
  },
  {
    path: "/jobs",
    exact: true,
    name: "Jobs",
    component: Jobs,
  },
];

export default routes;
