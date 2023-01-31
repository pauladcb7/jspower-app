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
import { GET_MCS } from "../../helpers/urls/index";
import { useSelector, useStore } from "react-redux";

import arrayMutators from "final-form-arrays";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import moment from "moment";

const required = (value) => (value ? undefined : "Required");

const MotorCheatSheet480 = () => {
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
  const [mcss, setMCSs] = useState([]);

  useEffect(() => {
    fetchTable();
  }, []);
  const fetchTable = () => {
    api
      .get(GET_MCS)
      .then((mcss) => {
        mcss?.map((mcs) => {
          return {
            ...mcs,
            motor_hp: mcs.motor_hp || "",
            nema_amp: mcs.nema_amp || "",
            starter_size: mcs.starter_size || "",
            overload: mcs.overload || "",
            mcp_type: mcs.mcp_type || "",
            conduit_size: mcs.conduit_size || "",
            awg: mcs.awg || "",
            awg_gnd: mcs.awg_gnd || ""
          };
        });
        setMCSs(mcss);
      })
      .catch((error) => {
        console.log(error);
        addToast("Something went wrong getting MCSs", {
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
            <CCardHeader>Motor Cheat Sheet 480V</CCardHeader>
            <CCardBody>
              <CDataTable
                items={mcss}
                fields={[
                  "motor_hp",
                  "nema_amp",
                  "starter_size",
                  "overload",
                  "mcp_type",
                  "conduit_size",
                  "awg",
                  "awg_gnd"
                ]}
                hover
                striped
                itemsPerPage={25}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default MotorCheatSheet480;
