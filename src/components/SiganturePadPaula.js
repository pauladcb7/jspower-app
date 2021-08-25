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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import SignaturePad from "signature_pad";
import { DocsLink } from "src/reusable";

const ESignature = () => {
  const ref = useRef(null);
  useEffect(() => {
    var canvas = document.querySelector("#eSignature");
    var signaturePad = new SignaturePad(canvas);
  }, [ref.current]);

  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" lg="4">
          <canvas ref={ref} id="eSignature"></canvas>
        </CCol>
      </CRow>
    </>
  );
};

export default ESignature;
