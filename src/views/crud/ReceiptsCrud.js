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
      key: "job_name",
      label: "Job Name",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "job_number",
      label: "Job Number",
      type: "number",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "work_order",
      label: "Work Order",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "receipt_file",
      label: "See Receipt",
      type: "image",
      sorter: false,
      filter: false,
      source: "",
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
          receipt_id: row.receipt_id,
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
      receipt_id: row.receipt_id,
      user_id: row.user_id,
      user_email: row.user_email,
      job_id: row.job_id,
      job_name: row.job_name,
      job_number: row.job_number,
      work_order_id: row.work_order_id,
      work_order: row.work_order,
      receipt_file: row.receipt_file,
      created_at: row.created_at,
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
                        user_email: edittedRow.user_email,
                        user_id: row.user_id,
                        job_name: edittedRow.job_name,
                        job_number: edittedRow.job_number,
                        job_id: row.job_id,
                        work_order_id: row.work_order_id,
                        work_order: edittedRow.work_order,
                        receipt_file: edittedRow.receipt_file,
                        created_at: edittedRow.created_at,
                        comments: edittedRow.comments,
                      },
                    })
                    .then((result) => {
                      addToast("Receipt Submitted.", {
                        appearance: "success",
                        autoDismiss: true,
                      });
                      fetchTable();
                    })
                    .catch((error) => {
                      addToast(
                        "Something went wrong creating Receipt. Try again.",
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
                        receipt_id: "-1",
                        user_email: e.user_email,
                        user_id: row.user_id,
                        job_name: e.job_name,
                        job_number: e.job_number,
                        job_id: row.job_id,
                        work_order_id: row.work_order_id,
                        work_order: e.work_order,
                        receipt_file: e.receipt_file,
                        created_at: e.created_at,
                        comments: e.comments,
                      },
                    })
                    .then((result) => {
                      addToast("Receipt Submitted.", {
                        appearance: "success",
                        autoDismiss: true,
                      });
                    })
                    .catch((error) => {
                      addToast(
                        "Something went wrong creating Receipt. Try again.",
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
