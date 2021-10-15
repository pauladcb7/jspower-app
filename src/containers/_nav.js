import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Forms"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Time Cards",
    to: "/timecards/create",
    icon: "cil-clock",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Work Order",
    to: "/work-order/create",
    icon: "cil-description",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Material Requisition",
    to: "/material-requisition/create",
    icon: "cil-layers",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Circuit Directory",
    to: "/circuit-directory/selector",
    icon: "cil-spreadsheet",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Safety Sheets",
    to: "/sign-sheet/list",
    icon: "cil-task",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Safety Sheets Creation",
    to: "/sheet/create",
    icon: "cil-task",
  },
];

export default _nav;
