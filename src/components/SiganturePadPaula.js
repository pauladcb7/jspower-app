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

const ESignature = ({onReady, svg, onChange = () => {}}) => {
  const ref = useRef(null);
  const [signaturePad, setSignaturePad] =useState(null);
  const [hasSign , setSign] = useState(svg);
  const [currentSign , setCurrentSign] = useState(null);
  useEffect(() => {
    setSign(svg)
  }, [svg])
  function resizeCanvas() {
    if(ref.current && signaturePad) {
      var ratio =  Math.max(window.devicePixelRatio || 1, 1);
      ref.current.width = ref.current.offsetWidth * ratio;
      ref.current.height = ref.current.offsetHeight * ratio;
      ref.current.getContext("2d").scale(ratio, ratio);
      signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    }
  }
  useEffect(() => {
    //debugger
    //var canvas = document.querySelector(ref.current);
    if(ref.current) {
      var signaturePad = new SignaturePad(ref.current,{
        onEnd: () => {
          onChange(signaturePad.toDataURL("image/svg+xml"))
          setCurrentSign(signaturePad.toDataURL("image/svg+xml"))
        }
      });
      onReady && onReady(signaturePad)
      setSignaturePad(signaturePad);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => {
      window.removeEventListener('resize',resizeCanvas)
    }
  }, [ref.current]);
  useEffect(() => {
    if(!hasSign) {
      resizeCanvas();
    } else {

    }

  },[hasSign])

  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" lg="4">
          <CCard className="esignature-canvas">
            <div style={{
              display: (currentSign !== hasSign && hasSign) ? 'block': 'none'
            }} 
              //dangerouslySetInnerHTML={{__html: hasSign}}
            >
              <img src={hasSign}/>
            </div>
            <canvas style={{
              display: (currentSign !== hasSign && hasSign) ? 'none': 'block'
            }}  ref={ref} ></canvas>
          </CCard>
          <CLabel style={{
            cursor: 'pointer'
          }} onClick={() => {
            setSign(null)
            signaturePad.clear();
          }}>Clean</CLabel>
        </CCol>
      </CRow>
    </>
  );
};

export default ESignature;
