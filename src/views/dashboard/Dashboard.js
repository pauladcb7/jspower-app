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
            header="Time Cards"
            text={<CIcon height="44" name="cil-clock" />}
            onClick={() => {
              history.push("/timecards/create");
            }}
          ></CWidgetSimple>
        </CCol>
        <CCol sm="4" md="6" lg="4" style={{ cursor: "pointer" }}>
          <CWidgetSimple
            header="Work Orders"
            text={<CIcon height="44" name="cil-description" />}
            onClick={() => {
              history.push("/work-order/create");
            }}
          ></CWidgetSimple>
        </CCol>
        <CCol sm="4" md="6" lg="4" style={{ cursor: "pointer" }}>
          <CWidgetSimple
            header="Material Requisition"
            text={<CIcon height="44" name="cil-layers" />}
            onClick={() => {
              history.push("/material-requisition/create");
            }}
          ></CWidgetSimple>
        </CCol>
        <CCol sm="4" md="6" lg="4" style={{ cursor: "pointer" }}>
          <CWidgetSimple
            header="Circuit Directory"
            text={<CIcon height="44" name="cil-spreadsheet" />}
            onClick={() => {
              history.push("/circuit-directory/selector");
            }}
          ></CWidgetSimple>
        </CCol>
        <CCol sm="4" md="6" lg="4" style={{ cursor: "pointer" }}>
          <CWidgetSimple
            header="Safety Sheets"
            text={<CIcon height="44" name="cil-task" />}
          ></CWidgetSimple>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
