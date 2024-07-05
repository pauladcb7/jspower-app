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

const ReceiptsCrud = () => {
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
      key: "id",
      label: "ID",
      type: "number",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
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
      key: "work_order_id",
      label: "Work Order ID",
      type: "number",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "receipt_file",
      label: "Receipt File",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
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
      key: "created_at",
      label: "Created At",
      type: "date",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
    },
    {
      key: "updated_at",
      label: "Updated At",
      type: "date",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "deleted_at",
      label: "Deleted At",
      type: "date",
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
          <CCard>
            <CCardHeader>Jobs</CCardHeader>

            {/* Form goes here */}
            <CForm onSubmit={onSubmit}>
              <CFormGroup>
                <CLabel htmlFor="job-name">Job Name</CLabel>
                <CSelect id="job-name" required>
                  <option value="">Please select...</option>
                  <option value="Job-1">Job 1</option>
                  <option value="Job-2">Job 2</option>
                  {/* Any other job name options */}
                </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="work-order">Work Order</CLabel>
                <CSelect id="work-order" required>
                  <option value="">Please select...</option>
                  <option value="Work-Order-1">Work Order 1</option>
                  <option value="Work-Order-2">Work Order 2</option>
                  {/* Any other work order options */}
                </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="file-input">Upload File</CLabel>
                <CInputFile id="file-input" type="file" />
              </CFormGroup>
              <CFormGroup>
                <CButton type="submit" variant="outline" color="success">
                  Submit
                </CButton>
              </CFormGroup>
            </CForm>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ReceiptsCrud;
