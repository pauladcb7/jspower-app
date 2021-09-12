import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
  CLink,
  CWidgetIcon,
  CDataTable,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import ESignature from "src/components/SiganturePadPaula";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { circuitPrint } from "src/utils/circuitPrint";
import CrudTable from "src/containers/CrudTable";

const required = (value) => (value ? undefined : "Required");

const fieldsTable = ["ckt", "load", "ckt1", "load1"];
const initialArray = [];
for (let index = 1; index < 43; index++) {
  const element = { ckt: index, load: "", ckt1: index + 1, load1: "" };
  initialArray.push(element);
  index++;
}
initialArray.push();

const TimeCardCrud = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [checkedJobLocations, setCheckedJobLocations] = React.useState({});
  useEffect(() => {
    console.log("checked items: ", checkedJobLocations);
  }, [checkedJobLocations]);

  const handleChange = (event) => {
    // updating an object instead of a Map
    setCheckedJobLocations({
      ...checkedJobLocations,
      [event.target.name]: event.target.checked,
      [event.target.name]: event.target.checked,
    });
  };

  const toggleMulti = (type) => {
    let newCollapse = collapseMulti.slice();
    switch (type) {
      case "left":
        newCollapse[0] = !collapseMulti[0];
        break;
      case "right":
        newCollapse[1] = !collapseMulti[1];
        break;
      case "both":
        newCollapse[0] = !collapseMulti[0];
        newCollapse[1] = !collapseMulti[1];
        break;
      default:
    }
    setCollapseMulti(newCollapse);
  };
  const onSubmit = function (e) {
    circuitPrint({
      date: e.date,
      voltage: e.voltage,
      rows,
    });
  };
  const validate = function () {};


  const rows = [
    {
      id: 1,
      jobName: ' Job Name',
      jobLocation: 'Job Location',
      jobDescription: 'jobDescription',
      clockIn: '12:00',
      clockIn: '13:00',
      lunchIn: '14:00',
      lunchOut: '15:00',
      signature: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjI1IDE4MCIgd2lkdGg9IjIyNSIgaGVpZ2h0PSIxODAiPjxwYXRoIGQ9Ik0gMjUuMDAwLDkzLjAwMCBDIDI3LjIxNyw4OC41ODQgMjcuMDAwLDg4LjUwMCAyOS4wMDAsODQuMDAwIiBzdHJva2Utd2lkdGg9IjQuOTk4IiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD48cGF0aCBkPSJNIDI5LjAwMCw4NC4wMDAgQyAyOS44OTIsNzkuMjE2IDMwLjcxNyw3OS41ODQgMzIuMDAwLDc1LjAwMCIgc3Ryb2tlLXdpZHRoPSIzLjk5OSIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSAzMi4wMDAsNzUuMDAwIEMgMzUuNzcwLDY4LjM0NiAzNS4zOTIsNjguMjE2IDQwLjAwMCw2Mi4wMDAiIHN0cm9rZS13aWR0aD0iMy4yMTMiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gNDAuMDAwLDYyLjAwMCBDIDQzLjcyNyw1Ni4yNzkgNDMuNzcwLDU2LjM0NiA0OC4wMDAsNTEuMDAwIiBzdHJva2Utd2lkdGg9IjMuMDkwIiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD48cGF0aCBkPSJNIDQ4LjAwMCw1MS4wMDAgQyA1MS43NjksNDUuMDk0IDUyLjIyNyw0NS43NzkgNTcuMDAwLDQxLjAwMCIgc3Ryb2tlLXdpZHRoPSIzLjEyNSIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSA1Ny4wMDAsNDEuMDAwIEMgNjMuODY4LDM2LjczNiA2My4yNjksMzYuMDk0IDcxLjAwMCwzMy4wMDAiIHN0cm9rZS13aWR0aD0iMy4wMTMiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gNzEuMDAwLDMzLjAwMCBDIDc0Ljc0MCwyOS43MjggNzQuMzY4LDMxLjIzNiA3OC4wMDAsMzAuMDAwIiBzdHJva2Utd2lkdGg9IjMuNTMwIiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD48cGF0aCBkPSJNIDc4LjAwMCwzMC4wMDAgQyA4Mi4zMTYsMzEuMTI3IDgwLjc0MCwzMC4yMjggODMuMDAwLDM0LjAwMCIgc3Ryb2tlLXdpZHRoPSI0LjQzMSIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSA4My4wMDAsMzQuMDAwIEMgODMuNjg1LDQyLjU1MSA4NC44MTYsNDEuNjI3IDgzLjAwMCw1MS4wMDAiIHN0cm9rZS13aWR0aD0iMy4wODMiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gODMuMDAwLDUxLjAwMCBDIDgzLjY0Niw2MS43NzggODIuMTg1LDYxLjA1MSA4MC4wMDAsNzEuMDAwIiBzdHJva2Utd2lkdGg9IjIuNzA0IiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD48cGF0aCBkPSJNIDgwLjAwMCw3MS4wMDAgQyA3MS45NzEsODIuMDU3IDc1LjE0Niw4My4yNzggNjYuMDAwLDk0LjAwMCIgc3Ryb2tlLXdpZHRoPSIyLjMxMiIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSA2Ni4wMDAsOTQuMDAwIEMgNjQuNTAwLDk5LjUwMCA2My40NzEsOTkuMDU3IDYzLjAwMCwxMDUuMDAwIiBzdHJva2Utd2lkdGg9IjIuOTYyIiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD48cGF0aCBkPSJNIDYzLjAwMCwxMDUuMDAwIEMgNjEuNjc2LDExMC41NTMgNjEuNTAwLDExMC41MDAgNjAuMDAwLDExNi4wMDAiIHN0cm9rZS13aWR0aD0iMy4yMzQiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gNjAuMDAwLDExNi4wMDAgQyA1Ny4wNzMsMTIzLjM5OSA1Ny42NzYsMTIzLjU1MyA1NS4wMDAsMTMxLjAwMCIgc3Ryb2tlLXdpZHRoPSIzLjAwMyIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSA1NS4wMDAsMTMxLjAwMCBDIDU1LjUxOSwxMzQuOTYyIDU0LjA3MywxMzQuMzk5IDU0LjAwMCwxMzguMDAwIiBzdHJva2Utd2lkdGg9IjMuNjIyIiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD48cGF0aCBkPSJNIDU0LjAwMCwxMzguMDAwIEMgNTEuMjQ2LDE0MS43NTQgNTIuMDE5LDE0MS45NjIgNDguMDAwLDE0NS4wMDAiIHN0cm9rZS13aWR0aD0iMy42OTAiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjxwYXRoIGQ9Ik0gNDguMDAwLDE0NS4wMDAgQyA0NS43MTYsMTQ3LjM3MCA0NS43NDYsMTQ3LjI1NCA0My4wMDAsMTQ5LjAwMCIgc3Ryb2tlLXdpZHRoPSIzLjkxMyIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+PHBhdGggZD0iTSA0My4wMDAsMTQ5LjAwMCBDIDQwLjQ0OSwxNDkuODg3IDQwLjcxNiwxNTAuMzcwIDM4LjAwMCwxNTEuMDAwIiBzdHJva2Utd2lkdGg9IjQuMTE1IiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjwvcGF0aD48cGF0aCBkPSJNIDM4LjAwMCwxNTEuMDAwIEMgMzAuNTg3LDE1MS4wMjMgMzQuOTQ5LDE1Mi4zODcgMzIuMDAwLDE1NC4wMDAiIHN0cm9rZS13aWR0aD0iNC40OTIiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPjwvc3ZnPg==',
    },
  ];
  //const [rows, setRow] = useState(rowsInitial);
  
  const metadata = [
    {
      key: 'jobName',
      label: 'Job Name',
      type: 'text',
      sorter: false,
      filter: false,
      _style: { minWidth: '120px'},
      
    },
    {
      key: 'jobLocation',
      label: 'Job Location',
      type: 'radius',
      sorter: false,
      filter: false,
      _style: { minWidth: '120px'},
      options: [
        {
          label: 'Location1',
          value: 'location1'
        },
        {
          label: 'Location2',
          value: 'location2'
        },
        {
          label: 'Location3',
          value: 'location3'
        },
        {
          label: 'Other',
          value: 'other',
          otherOption: true
        },
      ],
      
    },
    {
      key: 'jobDescription',
      label: 'Job Description',
      type: 'textarea',
      sorter: false,
      filter: false,
      _style: { minWidth: '190px'},
    },
    {
      key: 'clockIn',
      label: 'Clock In',
      type: 'time',
      sorter: false,
      filter: false,
      _style: { minWidth: '100px'},
    },
    {
      key: 'clockInGps',
      label: 'Clock In GPS',
      type: 'text',
      sorter: false,
      filter: false,
      _style: { minWidth: '100px'},
    },
    {
      key: 'clockOut',
      label: 'Clock Out',
      type: 'time',
      sorter: false,
      filter: false,
      _style: { minWidth: '100px'},
    },
    {
      key: 'clockOutGps',
      label: 'Clock Out GPS',
      type: 'text',
      sorter: false,
      filter: false,
      _style: { minWidth: '100px'},
    },
    {
      key: 'lunchIn',
      label: 'Lunch In',
      type: 'time',
      sorter: false,
      filter: false,
      _style: { minWidth: '100px'},
    },
    {
      key: 'lunchInGps',
      label: 'Lunch In GPS',
      type: 'text',
      sorter: false,
      filter: false,
      _style: { minWidth: '100px'},
    },
    {
      key: 'lunchOut',
      label: 'Lunch Out',
      type: 'time',
      sorter: false,
      filter: false,
      _style: { minWidth: '160px'},
    },
    {
      key: 'lunchOutGps',
      label: 'Lunch out GPS',
      type: 'text',
      sorter: false,
      filter: false,
      _style: { minWidth: '100px'},
    },
    {
      key: 'signature',
      label: 'Signature',
      type: 'signature',
      sorter: false,
      filter: false,
      _style: { minWidth: '150px'},
      hide:true
    },
  ]
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                Time Cards
                <div className="card-header-actions">
                  <CButton
                    color="link"
                    className="card-header-action btn-minimize"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <CIcon
                      name={collapsed ? "cil-arrow-top" : "cil-arrow-bottom"}
                    />
                  </CButton>
                </div>
              </CCardHeader>
              <CCollapse show={collapsed} timeout={1000}>
                <CCardBody>
                  <CrudTable
                    title="Time Card"
                    rows={rows}
                    metadata={metadata}
                  ></CrudTable>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};
/*  <CFade timeout={300} in={showElements} unmountOnExit={true}>
   <CrudTable
     rows={rows}
     metadata={metadata}
   ></CrudTable>
 </CFade>
</CCol>
</CRow> */

export default TimeCardCrud;
