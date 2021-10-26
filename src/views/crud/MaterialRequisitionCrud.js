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
  DELETE_WORK_ORDER,
  GET_MATERIAL_REQUISITION,
  MATERIAL_REQUISITION,
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

const MaterialRequisitionCrud = () => {
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

  /*   const rows = [
    {
      id: 1,
      jobName: "2002-12-12",
      jobLocation: "quepaso ",
      requestedBy: "Eric Vargas",
      entryDate: "12:00",
      needBy: "13:33",
      description: "Anywhere",
      materialRequisitionDetails: Array.from(Array(50).keys()).map(function (
        m,
        i
      ) {
        return {
          id: i + 1,
          quantity: 2,
          size: "L",
          partNumber: "23",
          itemDescription: "ID",
        };
      }),
    },
  ]; */
  //const [rows, setRow] = useState(rowsInitial);

  const metadata = [
    {
      key: "jobName",
      label: "Job Name",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
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
      label: "Employee Name",
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
      key: "needBy",
      label: "Need By",
      type: "date",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
    },
    {
      key: "description",
      label: "Description",
      type: "textarea",
      sorter: false,
      filter: false,
      _style: { minWidth: "160px" },
    },
    {
      key: "status",
      label: "Status",
      type: "text",
      sorter: false,
      filter: false,
      custom: (item) => (
        <td>
          <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
        </td>
      ),
      _style: { minWidth: "160px" },
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
      .delete(MATERIAL_REQUISITION, {
        data:{
          id: row.id,
        }
      })
      .then((data) => {
        console.log("data return ", data);
      });
  }

  function fetchTable() {
    setLoading(true);
    return api.get(GET_MATERIAL_REQUISITION).then((materialRequisition) => {
      setRows(
        materialRequisition?.map((mr) => {
          return {
            ...mr,
            entryDate: moment(mr.entryDate).format("YYYY-MM-DD"),
            needBy: moment(mr.needBy).format("YYYY-MM-DD"),
            description: mr.description || "",
            employeeName:
              mr.requestedBy?.firstName + " " + mr.requestedBy?.lastName,
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
                Material Requisition
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
                    title="Material Requisition"
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

export default MaterialRequisitionCrud;
