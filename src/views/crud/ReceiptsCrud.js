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
import { SAVE_RECEIPT, DELETE_RECEIPT, GET_RECEIPTS } from "src/helpers/urls";
import { api } from "src/helpers/api";
import { useToasts } from "react-toast-notifications";
import { useSelector } from "react-redux";
import moment from "moment";

const required = (value) => (value ? undefined : "Required");

const fieldsTable = ["ckt", "load", "ckt1", "load1"];
const initialArray = [];

initialArray.push();

const ReceiptsCrud = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [loading, setLoading] = useState(false);
  const [metadata, setMetaData] = useState([
    {
      key: "jobName",
      label: "Job Name",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "workOrder",
      label: "Work Order",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "job_id",
      label: "Job ID",
      type: "number",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "comments",
      label: "Comments",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "user_email",
      label: "Created By",
      type: "text",
      sorter: true,
      filter: true,
      _style: { minWidth: "120px" },
    },
    {
      key: "created_at",
      label: "Created At",
      type: "date",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
    },
  ]);
  useEffect(() => {}, []);

  const { addToast } = useToasts();

  const user = useSelector((state) => {
    return state.user;
  });

  const onSubmit = function (e) {};
  const validate = function () {};

  const [rows, setRows] = useState([]);
  //const [rows, setRow] = useState(rowsInitial);

  function onDelete(row, close) {
    return api
      .delete(DELETE_RECEIPT, {
        data: {
          id: row.id,
        },
      })
      .then(() => {
        addToast("Receipt Removed.", {
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

  function parseData(row) {
    return {
      user_id: row.user.id,
      job_id: row.job_id,
      work_order_id: row.work_order_id,
      receipt_file: row.receipt_file,
      comments: row.comments,
    };
  }
  function fetchTable() {
    setLoading(true);
    return api.get(GET_RECEIPTS).then((receipts) => {
      setRows((receipts || []).map(parseData));
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
          <CCard>
            <CCardHeader>Receipts</CCardHeader>
            <CCardBody>
              <CrudTable
                title="Receipt"
                rows={rows}
                metadata={metadata}
                onRefreshTable={fetchTable}
                loading={loading}
                onEdit={(row, edittedRow) => {
                  const e = edittedRow;
                  return api
                    .post(SAVE_RECEIPT, {
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
                    .post(SAVE_RECEIPT, {
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
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ReceiptsCrud;
