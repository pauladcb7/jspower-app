import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  CCard,
  CCol,
  CLabel,
  CRow,
} from "@coreui/react";
import SignaturePad from "signature_pad";

function useTraceUpdate(props) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}

const ESignature = (props) => {
  const {onReady, svg, onChange = () => {}} = props
  const ref = useRef(null);
  const [signaturePad, setSignaturePad] =useState(null);
  const [sign , setSign] = useState(svg);
  const [currentSign , setCurrentSign] = useState(null);
  const resizeCanvas = useCallback(() => {
    if(ref.current && signaturePad) {
      var ratio =  Math.max(window.devicePixelRatio || 1, 1);
      ref.current.width = ref.current.offsetWidth * ratio;
      ref.current.height = ref.current.offsetHeight * ratio;
      ref.current.getContext("2d").scale(ratio, ratio);
      signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    }
  },[signaturePad])
  /* function resizeCanvas() {
    if(ref.current && signaturePad) {
      var ratio =  Math.max(window.devicePixelRatio || 1, 1);
      ref.current.width = ref.current.offsetWidth * ratio;
      ref.current.height = ref.current.offsetHeight * ratio;
      ref.current.getContext("2d").scale(ratio, ratio);
      signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    }
  } */
  useEffect(() => {
    if(svg !== currentSign) {
      setSign(svg)
    }
    resizeCanvas()
  }, [svg,currentSign,resizeCanvas])
  useEffect(() => {
    //debugger
    //var canvas = document.querySelector(ref.current);
    if(ref.current) {
      var signaturePad = new SignaturePad(ref.current,{
        onEnd: () => {
          setCurrentSign(signaturePad.toDataURL("image/svg+xml"))
          onChange(signaturePad.toDataURL("image/svg+xml"))
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
    
  }, [ref]);
  /* useEffect(() => {
    if(!sign) {
      resizeCanvas();
    } else {
    }

  },[sign]) */
  useTraceUpdate(props);
  //debugger
  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" lg="4">
          <CCard className="esignature-canvas">
            <div style={{
              display: sign ? 'block': 'none'
            }} 
              //dangerouslySetInnerHTML={{__html: hasSign}}
            >
              <img alt="sign" src={sign}/>
            </div>
            <canvas style={{
              display: sign ? 'none': 'block'
            }}  ref={ref} ></canvas>
          </CCard>
          <CLabel style={{
            cursor: 'pointer'
          }} onClick={() => {
            setSign(null)
            signaturePad.clear();
          }}>Clear</CLabel>
        </CCol>
      </CRow>
    </>
  );
};

export default ESignature;
