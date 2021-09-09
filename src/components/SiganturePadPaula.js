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

const ESignature = ({onReady, svg}) => {
  const ref = useRef(null);
  const [signaturePad, setSignaturePad] =useState(null);
  useEffect(() => {
    //debugger
    //var canvas = document.querySelector(ref.current);
    if(ref.current) {
      var signaturePad = new SignaturePad(ref.current);
      onReady && onReady(signaturePad)
      setSignaturePad(signaturePad);
      if(svg) {
        signaturePad.fromDataURL(svg)
      }
    }
    function resizeCanvas() {
      if(ref.current) {
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        ref.current.width = ref.current.offsetWidth * ratio;
        ref.current.height = ref.current.offsetHeight * ratio;
        ref.current.getContext("2d").scale(ratio, ratio);
        signaturePad.clear(); // otherwise isEmpty() might return incorrect value
      }
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => {
      window.removeEventListener('resize',resizeCanvas)
    }
  }, [ref.current]);

  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" lg="4">
          <CCard className="esignature-canvas">
            {svg ? 
              <div dangerouslySetInnerHTML={{__html: svg}}></div>
              :
              <canvas ref={ref} ></canvas>
            }
          </CCard>
          <CLabel style={{
            cursor: 'pointer'
          }} onClick={() => {
            signaturePad.clear();
          }}>Clean</CLabel>
        </CCol>
      </CRow>
    </>
  );
};

export default ESignature;
