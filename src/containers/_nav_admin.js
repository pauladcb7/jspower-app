import React from "react";
import CIcon from "@coreui/icons-react";
import { CNavItem, CNavTitle } from "@coreui/react";
const _nav_admin = [
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
    to: "/safety-sheets/list",
    icon: "cil-task",
  },
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Lists"],
  // },
  {
    _tag: "CSidebarNavDropdown",
    name: (
      <>
        <span
          style={{
            fontWeight: "700",
            fontSize: "80%",
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          LISTS
        </span>
      </>
    ),
    route: "/dashboard",
    //icon: "cil-list",
    _show: true,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: (
          <>
            {" "}
            <CIcon name="cil-list" style={{ "margin-right": "10px" }} />
            Jobs
          </>
        ),
        to: "/jobs",
        // icon: "cil-list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Motor Cheat Sheet 480V",
        to: "/mcs",
        // icon: <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />,
        badge: {
          color: "info",
          text: "NEW",
        },
      },
    ],
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Reports"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Time Card",
    to: "/report/time-card",
    icon: "cil-clock",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Work Order",
    to: "/report/work-order",
    icon: "cil-description",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Material Requisition",
    to: "/report/material-requisition",
    icon: "cil-layers",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Circuit Directory",
    to: "/report/circuit-directory",
    icon: "cil-spreadsheet",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Safety Sheets",
    to: "/safety-sheets",
    icon: "cil-task",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Jobs Edition",
    to: "/jobs/edition",
    icon: "cil-list",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Motor Cheat Sheet Edition",
    to: "/mcs/edition",
    icon: "cil-list",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Receipts",
    to: "/receipts/create",
    icon: "cil-layers",
  },
];

export default _nav_admin;
