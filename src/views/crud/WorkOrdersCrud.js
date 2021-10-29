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
import { workOrderPrint } from "src/utils/workOrder";
import {
  DELETE_WORK_ORDER,
  GET_WORK_ORDER,
  SAVE_WORK_ORDER,
  WORK_TYPES,
} from "src/helpers/urls";
import { api } from "src/helpers/api";
import { useToasts } from "react-toast-notifications";
import { useSelector } from "react-redux";
import moment from "moment";

const required = (value) => (value ? undefined : "Required");

const fieldsTable = ["ckt", "load", "ckt1", "load1"];
const initialArray = [];
for (let index = 1; index < 43; index++) {
  const element = { ckt: index, load: "", ckt1: index + 1, load1: "" };
  initialArray.push(element);
  index++;
}
initialArray.push();

const WorkOrdersCrud = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [checkedJobLocations, setCheckedJobLocations] = React.useState({});
  const [loading, setLoading] = useState(false);
  const [metadata, setMetaData] = useState([
    {
      key: "entryDate",
      label: "Date",
      type: "date",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
    },
    {
      key: "workTypeRc",
      otherKey: "workTypeOther",
      label: "Type of work",
      options: [
        {
          label: "Service Call",
          value: "service-call",
        },
        {
          label: "Extra",
          value: "extra",
        },
        {
          label: "Other",
          value: "other",
          otherOption: true,
        },
      ],
      type: "radius",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
    },
    {
      key: "employeeName",
      label: "Employee Name",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "190px" },
      required: true,
    },
    {
      key: "startTime",
      label: "Start Time",
      type: "time",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
      required: true,
    },
    {
      key: "endTime",
      label: "End Time",
      type: "time",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
      required: true,
    },
    {
      key: "jobLocation",
      label: "Job Location",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "160px" },
      required: true,
    },
    {
      key: "jobDetails",
      label: "Job Details",
      type: "textarea",
      sorter: false,
      filter: false,
      _style: { minWidth: "160px" },
      required: true,
    },
    {
      key: "totalCost",
      label: "Labor & Material Total",
      type: "currency",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
    },
    {
      key: "---Separator---",
      label: "Customer Information",
      type: "separator",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
      hide: true,
    },
    {
      key: "customerName",
      label: "Customer Full Name",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "150px" },
      required: true,
    },
    {
      key: "customerAddress",
      label: "Customer Address",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "150px" },
      required: true,
    },
    {
      key: "customerPhone",
      label: "Customer Phone Number",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "150px" },
      required: true,
    },
    {
      key: "customer_email",
      label: "Customer Email",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "150px" },
      required: true,
    },
    {
      key: "customerSignature",
      label: "Customer Signature",
      type: "signature",
      sorter: false,
      filter: false,
      _style: { minWidth: "150px" },
      hide: true,
      disableEdit: true,
    },
    {
      key: "employeeSignature",
      label: "Employee Signature",
      type: "signature",
      sorter: false,
      filter: false,
      _style: { minWidth: "150px" },
      hide: true,
      disableEdit: true,
    },
  ]);
  useEffect(() => {}, [checkedJobLocations]);

  const { addToast } = useToasts();

  const user = useSelector((state) => {
    return state.user;
  });
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

  const [rows, setRows] = useState([]);
  //const [rows, setRow] = useState(rowsInitial);

  function onDelete(row, close) {
    return api
      .delete(DELETE_WORK_ORDER, {
        data: {
          id: row.id,
        },
      })
      .then(() => {
        addToast("Work Order Removed.", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        console.log(err);
        addToast("Something went wrong. Try again.", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  }

  const [workTypes, setWorkTypes] = useState([
    {
      id: 1,
      value: "Extra",
      code: "EXTRA",
    },
    {
      id: 2,
      value: "Service Call",
      code: "SERVICE_CALL",
    },
    {
      id: 4,
      value: "Work Order",
      code: "WORK_ORDER",
    },
  ]);

  function parseData(row) {
    let [first_name, last_name] = row.user_email.split("@")[0].split(".");
    first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1);
    last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1);

    const fullName = row.user_name
      ? row.user_name
      : first_name + " " + last_name;
    return {
      entryDate: moment(row.entry_date).format("YYYY-MM-DD"),
      workTypeRc: String(row.work_type_rc || "other"),
      employeeName: row.user_name ? row.user_name : fullName,
      startTime: row.start_time,
      endTime: row.end_time,
      jobLocation: row.job_location,
      jobDetails: row.job_details,
      totalCost: row.total_cost,
      customerName: row.customer_name,
      customerPhone: row.customer_phone_number,
      customerAddress: row.customer_address,
      customer_email: row.customer_email,
      customerSignature: row.customer_signature,
      employeeSignature: row.employee_signature,
      workTypeOther: row.other,
      id: row.id,
    };
  }
  function fetchTable() {
    setLoading(true);
    return api.get(GET_WORK_ORDER).then((workOrders) => {
      setRows((workOrders || []).map(parseData));
      setLoading(false);
    });
  }
  useEffect(() => {
    api
      .get(WORK_TYPES)
      .then((data) => {
        const newMetadata = [...metadata];
        newMetadata[1].options = [
          ...data.map((e) => {
            return {
              ...e,
              value: String(e.id),
              label: e.value,
            };
          }),
          {
            label: "Other",
            value: "other",
            otherOption: true,
          },
        ];
        setMetaData(newMetadata);
        //setWorkTypes(data);
      })
      .catch((error) => {
        console.log(error);
        addToast(
          "Something went wrong loading Job Locations. Refresh the page.",
          {
            appearance: "error",
            autoDismiss: true,
          }
        );
      });
    fetchTable();
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                Work Orders
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
                    title="Work Order"
                    rows={rows}
                    metadata={metadata}
                    onRefreshTable={fetchTable}
                    loading={loading}
                    onEdit={(row, edittedRow) => {
                      const e = edittedRow;
                      return api
                        .post(SAVE_WORK_ORDER, {
                          data: {
                            work_order_id: row.id,
                            user_id: user.email,
                            entry_date: row.entryDate,
                            start_time: edittedRow.startTime,
                            end_time: edittedRow.endTime,
                            job_location: edittedRow.jobLocation,
                            job_details: edittedRow.jobDetails,
                            total_cost: edittedRow.totalCost,
                            employee_signature: edittedRow.employeeSignature,
                            customer_name: edittedRow.customerName,
                            customer_address: edittedRow.customerAddress,
                            customer_phone_number: edittedRow.customerPhone,
                            customer_signature: edittedRow.customerSignature,
                            work_type:
                              edittedRow.workTypeRc === "other"
                                ? null
                                : edittedRow.workTypeRc,
                            other:
                              edittedRow.workTypeRc === "other"
                                ? edittedRow.workTypeOther
                                : null,
                            customer_email: edittedRow.customer_email,
                          },
                        })
                        .then((result) => {
                          addToast("Work Order Submitted.", {
                            appearance: "success",
                            autoDismiss: true,
                          });
                          fetchTable();
                        })
                        .catch((error) => {
                          addToast(
                            "Something went wrong creating Work Order. Try again.",
                            {
                              appearance: "error",
                              autoDismiss: true,
                            }
                          );
                          throw error;
                        });
                    }}
                    onCreate={(row) => {
                      const e = row;
                      return api
                        .post(SAVE_WORK_ORDER, {
                          data: {
                            work_order_id: "-1",
                            user_id: user.email,
                            entry_date: row.entryDate,
                            start_time: e.startTime,
                            end_time: e.endTime,
                            job_location: e.jobLocation,
                            job_details: e.jobDetails,
                            total_cost: e.totalCost,
                            employee_signature: e.employeeSignature,
                            customer_name: e.customerName,
                            customer_address: e.customerAddress,
                            customer_phone_number: e.customerPhone,
                            customer_signature: e.customerSignature,

                            work_type:
                              e.workTypeRc === "other" ? null : e.workTypeRc,
                            other:
                              e.workTypeRc === "other" ? e.workTypeOther : null,
                            customer_email: e.customer_email,
                          },
                        })
                        .then((result) => {
                          addToast("Work Order Submitted.", {
                            appearance: "success",
                            autoDismiss: true,
                          });
                        })
                        .catch((error) => {
                          addToast(
                            "Something went wrong creating Work Order. Try again.",
                            {
                              appearance: "error",
                              autoDismiss: true,
                            }
                          );
                          throw error;
                        });
                    }}
                    onDelete={onDelete}
                    addOption={(row) => {
                      return (
                        <>
                          <CButton
                            color="secondary"
                            size="sm"
                            onClick={() => {
                              const optionFound = metadata[1].options.find(
                                (option) => {
                                  return (
                                    row.workTypeRc === option.value &&
                                    !option.otherOption
                                  );
                                }
                              );
                              workOrderPrint({
                                date: row.entryDate,
                                workType:
                                  row.workTypeRc === "other"
                                    ? row.workTypeOther
                                    : optionFound?.label,
                                employeeName: row.employeeName,
                                startTime: row.startTime,
                                endTime: row.endTime,
                                jobLocation: row.jobLocation,
                                jobDetails: row.jobDetails,
                                customerInformation: row.customerName,
                                totalCost: row.totalCost,
                                customerSignature: row.customerSignature,
                                employeeSignature: row.employeeSignature,
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

export default WorkOrdersCrud;
