import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CFade,
  CRow,
  CBadge,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import ESignature from "src/components/SiganturePadPaula";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { circuitPrint } from "src/utils/circuitPrint";
import CrudTable from "src/containers/CrudTable";
import { materialRequisitionPrint } from "src/utils/materialRequisitionPrint";
import {
  SAVE_SAFETY_SHEET,
  GET_SAFETY_SHEET,
  SAFETY_SHEET,
} from "src/helpers/urls";
import { api } from "src/helpers/api";
import moment from "moment";

const required = (value) => (value ? undefined : "Required");
const getBadge = (status) => {
  switch (status) {
    case "OPEN":
      return "success";
    case "CLOSED":
      return "danger";
    default:
      return "primary";
  }
};
const fieldsTable = ["ckt", "load", "ckt1", "load1"];
const initialArray = [];
for (let index = 1; index < 43; index++) {
  const element = { ckt: index, load: "", ckt1: index + 1, load1: "" };
  initialArray.push(element);
  index++;
}
initialArray.push();

const SafetySheetCrud = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [checkedJobLocations, setCheckedJobLocations] = React.useState({});
  useEffect(() => {}, [checkedJobLocations]);

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

  const metadata = [
    {
      key: "jobLocation",
      label: "Job Location",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "employeeName",
      label: "Supervisor",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "190px" },
    },
    {
      key: "entryDate",
      label: "Entry Date",
      type: "date",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
    },
    {
      key: "startTime",
      label: "Time Started",
      type: "date",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
    },
    {
      key: "endTime",
      label: "Time Finished",
      type: "date",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
    },
    {
      key: "safetySuggestions",
      label: "Work-Site Hazards and Safety Suggestions",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
    },
    {
      key: "safetyViolations",
      label: "Personnel Safety Violations",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
    },

    {
      key: "materialDetails",
      label: "Job Details",
      type: "array",
      shape: [
        {
          key: "id",
          type: "idNumeric",
        },
        {
          key: "quantity",
          type: "text",
          _style: { minWidth: "160px" },
        },
        {
          key: "size",
          type: "text",
          _style: { minWidth: "160px" },
        },
        {
          key: "partNumber",
          type: "text",
          _style: { minWidth: "160px" },
        },
        {
          key: "itemDescription",
          type: "text",
          _style: { minWidth: "160px" },
        },
      ],
      sorter: false,
      filter: false,
      _style: { minWidth: "160px" },
      hide: true,
    },
  ];
  function onDelete(row, close) {
    api
      .delete(SAFETY_SHEET, {
        id: row.id,
      })
      .then((data) => {
        console.log("data return ", data);
      });
  }

  function fetchTable() {
    setLoading(true);
    return api.get(GET_SAFETY_SHEET).then((safetySheet) => {
      setRows(
        safetySheet?.map((ss) => {
          return {
            ...ss,
            entryDate: moment(ss.entryDate).format("YYYY-MM-DD"),
            safetySuggestions: ss.safetySuggestions || "",
            safetyViolations: ss.safetyViolations || "",
            supervisor:
              ss.supervisor?.firstName + " " + ss.supervisor?.lastName,
          };
        })
      );
      setLoading(false);
    });
  }
  useEffect(() => {
    fetchTable();
  }, []);
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                Safety Sheets
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
                    loading={loading}
                    title="Safety Sheet"
                    rows={rows}
                    metadata={metadata}
                    onEdit={(row, edittedRow) => {
                      console.log(edittedRow);
                    }}
                    onRefreshTable={fetchTable}
                    onCreate={(row) => {}}
                    onDelete={onDelete}
                    addOption={(row) => {
                      return (
                        <>
                          <CButton
                            color="secondary"
                            size="sm"
                            onClick={() => {
                              materialRequisitionPrint({
                                jobName: row.jobName,
                                description: row.description,
                                jobLocation: row.jobLocation,
                                requestedBy: row.requestedBy,
                                todayDate: row.entryDate,
                                needBy: row.needBy,
                                materialRequisitionDetails:
                                  row.materialRequisitionDetails,
                              });
                              //toggleDetails(index)
                            }}
                          >
                            <CIcon width={24} name="cil-print" />
                          </CButton>
                        </>
                      );
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

export default SafetySheetCrud;
