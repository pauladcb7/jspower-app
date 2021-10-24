import React, { lazy } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CWidgetSimple,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router";

const Dashboard = () => {
  const history = useHistory();
  return (
    <>
      <CRow>
        <CCol sm="4" md="6" lg="4" style={{ cursor: "pointer" }}>
          <CWidgetSimple
            header={
              <div style={{ fontSize: "14px", color: "white" }}>Time Cards</div>
            }
            style={{
              borderColor: "#2eb85c",
              backgroundColor: "rgba(46, 184, 92, 0.88)",
              color: "white",
            }}
            text={<CIcon height="44" name="cil-clock" />}
            onClick={() => {
              history.push("/timecards/create");
            }}
          ></CWidgetSimple>
        </CCol>
        <CCol sm="4" md="6" lg="4" style={{ cursor: "pointer" }}>
          <CWidgetSimple
            header={
              <div style={{ fontSize: "14px", color: "white" }}>
                Work Orders
              </div>
            }
            text={<CIcon height="44" name="cil-description" />}
            style={{
              borderColor: "#636f83",
              backgroundColor: "rgba(99, 111, 131, 0.88)",
              color: "white",
            }}
            onClick={() => {
              history.push("/work-order/create");
            }}
          ></CWidgetSimple>
        </CCol>
        <CCol sm="4" md="6" lg="4" style={{ cursor: "pointer" }}>
          <CWidgetSimple
            header={
              <div style={{ color: "white", fontSize: "14px" }}>
                Material Requisition
              </div>
            }
            text={<CIcon height="44" name="cil-layers" />}
            style={{
              borderColor: "#f9b115",
              backgroundColor: "rgba(249, 177, 21, 0.88)",
              color: "white",
            }}
            onClick={() => {
              history.push("/material-requisition/create");
            }}
          ></CWidgetSimple>
        </CCol>
        <CCol sm="4" md="6" lg="4" style={{ cursor: "pointer" }}>
          <CWidgetSimple
            header={
              <div style={{ color: "white", fontSize: "14px" }}>
                Circuit Directory
              </div>
            }
            text={<CIcon height="44" name="cil-spreadsheet" />}
            style={{
              borderColor: "#321fdb",
              backgroundColor: "rgba(50, 31, 219, 0.88)",
              color: "white",
            }}
            onClick={() => {
              history.push("/circuit-directory/selector");
            }}
          ></CWidgetSimple>
        </CCol>
        <CCol sm="4" md="6" lg="4" style={{ cursor: "pointer" }}>
          <CWidgetSimple
            header={
              <div style={{ color: "white", fontSize: "14px" }}>
                Safety Sheets
              </div>
            }
            style={{
              borderColor: "#39f",
              backgroundColor: "rgba(51, 153, 255, 0.88)",
              color: "white",
            }}
            text={<CIcon height="44" name="cil-task" />}
            onClick={() => {
              history.push("/safety-sheets/list");
            }}
          ></CWidgetSimple>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
