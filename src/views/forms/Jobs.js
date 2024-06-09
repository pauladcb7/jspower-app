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
            number: job.job_number || "",
            name: job.job_name || "",
            manager: job.manager || "",
            company_name: job.company_name || "",
            company_phone: job.company_phone || "",
            billing_address: job.billing_address || "",
            working_address: job.working_address || "",
            main_contact_name: job.main_contact_name || "",
            main_contact_number: job.main_contact_number || "",
            job_desc: job.job_desc || "",
            any_material: job.any_material || "",
            start_date: job.start_date || "",
            end_date: job.end_date || "",
            quoted_or_time_material: job.quoted_or_time_material || "",
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
                  "number",
                  "name",
                  "manager",
                  "company_name",
                  "company_phone",
                  "billing_address",
                  "working_address",
                  "main_contact_name",
                  "main_contact_number",
                  "job_desc",
                  "any_material",
                  "start_date",
                  "end_date",
                  "quoted_or_time_material",
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
