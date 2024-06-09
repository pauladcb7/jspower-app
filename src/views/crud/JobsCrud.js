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
import { JOB, GET_JOB, SAVE_JOB } from "src/helpers/urls";
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

const JobsCrud = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [checkedJobLocations, setCheckedJobLocations] = React.useState({});
  const [loading, setLoading] = useState(false);
  const [metadata, setMetaData] = useState([
    {
      key: "jobNumber",
      label: "Job Number",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
    },
    {
      key: "jobName",
      label: "Job Name",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "manager",
      label: "Manager",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
          key: "company_name",
          label: "Company Name",
          type: "text",
          sorter: false,
          filter: false,
          _style: { minWidth: "120px" },
    },
    {
          key: "company_phone",
          label: "Company Phone",
          type: "text",
          sorter: false,
          filter: false,
          _style: { minWidth: "120px" },
    },
    {
          key: "billing_address",
          label: "Billing Address",
          type: "text",
          sorter: false,
          filter: false,
          _style: { minWidth: "120px" },
    },
    {
          key: "working_address",
          label: "Working Address",
          type: "text",
          sorter: false,
          filter: false,
          _style: { minWidth: "120px" },
    },
    {
          key: "main_contact_name",
          label: "Main Contact Name",
          type: "text",
          sorter: false,
          filter: false,
          _style: { minWidth: "120px" },
    },
    {
          key: "main_contact_number",
          label: "Main Contact Number",
          type: "text",
          sorter: false,
          filter: false,
          _style: { minWidth: "120px" },
    },
    {
          key: "job_desc",
          label: "Job Description",
          type: "text",
          sorter: false,
          filter: false,
          _style: { minWidth: "120px" },
    },
    {
          key: "any_material_yn",
          label: "Any Material?",
          type: "text",
          sorter: false,
          filter: false,
          _style: { minWidth: "120px" },
    },
    {
          key: "start_date",
          label: "Start Date",
          type: "text",
          sorter: false,
          filter: false,
          _style: { minWidth: "120px" },
    },
    {
          key: "end_date",
          label: "End Date",
          type: "text",
          sorter: false,
          filter: false,
          _style: { minWidth: "120px" },
    },
    {
          key: "quoted_or_tm",
          label: "Quoted or Time and Material?",
          type: "text",
          sorter: false,
          filter: false,
          _style: { minWidth: "120px" },
    },

    // {
    //   key: "percentage",
    //   label: "Percentage",
    //   type: "text",
    //   sorter: false,
    //   filter: false,
    //   _style: { minWidth: "190px" },
    // },
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
      .delete(JOB, {
        data: {
          id: row.id,
        },
      })
      .then(() => {
        addToast("Job Removed.", {
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
      jobNumber: row.job_number,
      jobName: row.job_name,
      percentage: row.percentage,
      id: row.id,
    };
  }
  function fetchTable() {
    setLoading(true);
    return api.get(GET_JOB).then((jobs) => {
      setRows((jobs || []).map(parseData));
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
              <CCardHeader>Jobs</CCardHeader>
              <CCollapse show={true} timeout={1000}>
                <CCardBody>
                  <CrudTable
                    title="Jobs"
                    rows={rows}
                    metadata={metadata}
                    onRefreshTable={fetchTable}
                    loading={loading}
                    onEdit={(row, edittedRow) => {
                      const e = edittedRow;
                      return api
                        .post(SAVE_JOB, {
                          job_id: e.id,
                          job_number: e.jobNumber,
                          job_name: e.jobName,
                          percentage: e.percentage,
                        })
                        .then((result) => {
                          addToast("Job Updated", {
                            appearance: "success",
                            autoDismiss: true,
                          });
                          fetchTable();
                        })
                        .catch((error) => {
                          addToast(
                            "Something went wrong creating Job. Try again.",
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
                        .post(SAVE_JOB, {
                          job_id: "-1",
                          job_number: row.jobNumber,
                          job_name: row.jobName,
                          percentage: row.percentage,
                        })
                        .then((result) => {
                          addToast("Job Created.", {
                            appearance: "success",
                            autoDismiss: true,
                          });
                        })
                        .catch((error) => {
                          addToast(
                            "Something went wrong creating Job. Try again.",
                            {
                              appearance: "error",
                              autoDismiss: true,
                            }
                          );
                          throw error;
                        });
                    }}
                    onDelete={onDelete}
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

export default JobsCrud;
