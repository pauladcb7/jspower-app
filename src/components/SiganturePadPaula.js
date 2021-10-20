import React, { useState, useEffect, useRef, useCallback } from "react";
import { CCard, CCol, CLabel, CRow } from "@coreui/react";
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
      console.log("Changed props:", changedProps);
    }
    prev.current = props;
  });
}

function isVisible(domElement) {
  return new Promise((resolve) => {
    const o = new IntersectionObserver(([entry]) => {
      resolve(entry.intersectionRatio === 1);
      o.disconnect();
    });
    o.observe(domElement);
  });
}

const ESignature = (props) => {
  const { onReady, svg, onChange = () => {} } = props;
  const ref = useRef(null);
  const [signaturePad, setSignaturePad] = useState(null);
  const [sign, setSign] = useState(svg);
  const [hideImage, setHideImage] = useState(!svg);
  const [currentSign, setCurrentSign] = useState(null);
  const resizeCanvas = useCallback((signaturePad2) => {
    if (ref.current && (signaturePad || signaturePad2)) {
      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      ref.current.width = ref.current.offsetWidth * ratio;
      ref.current.height = ref.current.offsetHeight * ratio;
      ref.current.getContext("2d").scale(ratio, ratio);
      //(signaturePad || signaturePad2).clear(); // otherwise isEmpty() might return incorrect value
    }
  });
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
    var signaturePad2 = new SignaturePad(ref.current, {
      onEnd: () => {
        //setCurrentSign(signaturePad2.toDataURL())
        setHideImage(true);
        onChange(signaturePad2.toDataURL());
      },
    });
    if (props.disableEdit) {
      signaturePad2.off();
    }
    onReady && onReady(signaturePad2);
    setSignaturePad(signaturePad2);

    resizeCanvas(signaturePad2);
    const o = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio > 0) {
        if (signaturePad2.isEmpty()) {
          resizeCanvas(signaturePad2);
        }
      }
    });
    o.observe(ref.current);
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      o.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [ref]);
  useEffect(() => {
    if (signaturePad) {
      if (props.disableEdit) {
        signaturePad.off();
      } else {
        signaturePad.on();
      }
    }
  }, [props.disableEdit, signaturePad]);
  /* useEffect(() => {
    if(!sign) {
      resizeCanvas();
    } else {
    }

  },[sign]) */
  useTraceUpdate(props);
  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" lg="4">
          <CCard className="esignature-canvas">
            <canvas
              style={{
                display: "block",
              }}
              ref={ref}
            ></canvas>
            {!hideImage && <img alt="sign" src={svg} />}
          </CCard>
          {!props.disableEdit && (
            <CLabel
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setSign(null);
                signaturePad.clear();
                setHideImage(true);
                resizeCanvas();
              }}
            >
              Clear
            </CLabel>
          )}
        </CCol>
      </CRow>
    </>
  );
};

export default ESignature;
