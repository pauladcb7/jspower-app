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
  CImg,
  CFormCheck,
  CTabContent,
  CTabPane,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import ESignature from "src/components/SiganturePadPaula";
import moment from "moment";

import { useToasts } from "react-toast-notifications";
import { api } from "../../../helpers/api";
import { logo } from "src/utils/logo";

const Profile = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12" lg="4" className="p-0">
          <div className="text-center">
            <CImg
              align="center"
              fluid
              className="img-fluid"
              // width={200}
              // height={200}
              src={"tutorial/aths1.png"}
              // className="c-avatar-img"
            />
          </div>
        </CCol>
        <CCol xs="12" sm="12" lg="4" className="p-0">
          <div className="text-center">
            <CImg
              align="center"
              fluid
              className="img-fluid"
              // width={200}
              // height={200}
              src={"tutorial/aths2.png"}
              // className="c-avatar-img"
            />
          </div>
        </CCol>
        <CCol xs="12" sm="12" lg="4" className="p-0">
          <div className="text-center">
            <CImg
              align="center"
              fluid
              className="img-fluid"
              // width={200}
              // height={200}
              src={"tutorial/aths3.png"}
              // className="c-avatar-img"
            />
          </div>
        </CCol>
      </CRow>
    </>
  );
};

export default Profile;
