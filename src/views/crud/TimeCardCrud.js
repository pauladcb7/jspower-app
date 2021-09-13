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
import { timecardPrint } from "src/utils/timecardPrint";

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
      signature: 'data:image/png;base64,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',
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
                    addOption={(row) => {
                     return <>
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          timecardPrint({
                            //rows: 
                            employeeName: row.employeeName,
                            jobName: row.jobName,
                            jobLocations: row.jobLocation,
                            employeeSignature: row.signature
                          })
                          //toggleDetails(index)
                        }}
                      >
                      <CIcon width={24} name="cil-print" />
                      </CButton> 
                     </>
                    }}
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
