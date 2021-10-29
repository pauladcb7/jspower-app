import React, { useState, useEffect, useRef } from "react";
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
  CBadge,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButtonGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import ESignature from "src/components/SiganturePadPaula";
import { useToasts } from "react-toast-notifications";
import { api } from "../../helpers/api";
import { GET_JOB } from "../../helpers/urls/index";
import { useSelector, useStore } from "react-redux";

import arrayMutators from "final-form-arrays";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { materialRequisitionPrint } from "src/utils/materialRequisitionPrint";
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

const Jobs = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [details, setDetails] = useState([]);
  const [rows, setRow] = useState([{}, {}, {}, {}]);
  const [visible, setVisible] = useState(false);
  const { addToast } = useToasts();
  const [initialValues, setInitialValue] = useState({});
  const [materialReqId, setMaterialReqId] = useState([]);
  const user = useSelector((state) => {
    return state.user;
  });
  const ref = useRef(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchTable();
  }, []);
  const fetchTable = () => {
    api
      .get(GET_JOB)
      .then((jobs) => {
        jobs?.map((job) => {
          return {
            ...job,
            jobNumber: job.job_number || "",
            jobName: job.job_name || "",
            // percentage: job.percentage || ""
          };
        });
        setJobs(jobs);
      })
      .catch((error) => {
        console.log(error);
        addToast("Something went wrong getting Jobs", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader>Jobs</CCardHeader>
            <CCardBody>
              <CDataTable
                items={jobs}
                fields={[
                  "job_number",
                  "job_name",
                  // "percentage",
                ]}
                hover
                striped
                itemsPerPage={15}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Jobs;
