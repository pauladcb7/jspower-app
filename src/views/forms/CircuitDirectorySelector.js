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
import { useHistory } from "react-router-dom";

const required = (value) => (value ? undefined : "Required");

const fieldsTable = ["ckt", "load", "ckt1", "load1"];
const initialArray = [];
for (let index = 1; index < 43; index++) {
  const element = { ckt: index, load: "", ckt1: index + 1, load1: "" };
  initialArray.push(element);
  index++;
}
initialArray.push();

const CircuitDirectorySelector = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [checkedJobLocations, setCheckedJobLocations] = React.useState({});
  const [rows, setRow] = useState(initialArray);
  useEffect(() => {
    console.log("checked items: ", checkedJobLocations);
  }, [checkedJobLocations]);

  const handleChange = (event) => {
    // updating an object instead of a Map
    setCheckedJobLocations({
      ...checkedJobLocations,
      [event.target.name]: event.target.checked,
      [event.target.name]: event.target.checked,
    });
  };

  const toggleMulti = (type) => {
    let newCollapse = collapseMulti.slice();
    switch (type) {
      case "left":
        newCollapse[0] = !collapseMulti[0];
        break;
      case "right":
        newCollapse[1] = !collapseMulti[1];
        break;
      case "both":
        newCollapse[0] = !collapseMulti[0];
        newCollapse[1] = !collapseMulti[1];
        break;
      default:
    }
    setCollapseMulti(newCollapse);
  };
  const onSubmit = function (e) {
    circuitPrint({
      date: e.date,
      voltage: e.voltage,
      rows,
    });
  };
  const validate = function () {};
  const history = useHistory();
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12" lg="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CRow row>
              <CCol sm="12" md="6">
                <CButton
                  onClick={() => setCollapsed(!collapsed)}
                  // onClick={() => {
                  //   history.push("/circuit-directory-business/create");
                  // }}
                  block
                  color="dark"
                  type="button"
                  size="lg"
                >
                  <CIcon size="lg" name="cil-building" /> Business
                </CButton>

                <CCol className="p-2">
                  <CCollapse timeout={2000} show={collapsed}>
                    <CButton
                      onClick={() => {
                        history.push("/circuit-directory-business-208/create");
                      }}
                      block
                      color="dark"
                      type="button"
                      size="lg"
                    >
                      <strong style={{ color: "black" }}>l</strong>{" "}
                      <strong style={{ color: "red" }}>l</strong>{" "}
                      <strong style={{ color: "blue" }}>l</strong> 208 Volt
                    </CButton>
                    <CButton
                      onClick={() => {
                        history.push("/circuit-directory-business-480/create");
                      }}
                      block
                      color="dark"
                      type="button"
                      size="lg"
                    >
                      <strong style={{ color: "brown" }}>l</strong>{" "}
                      <strong style={{ color: "orange" }}>l</strong>{" "}
                      <strong style={{ color: "yellow" }}>l</strong> 480 Volt
                    </CButton>
                  </CCollapse>
                </CCol>
              </CCol>
              <CCol sm="12" md="6">
                <CButton
                  onClick={() => {
                    history.push("/circuit-directory-home/create");
                  }}
                  block
                  color="dark"
                  type="button"
                  size="lg"
                >
                  <CIcon size="lg" name="cil-home" /> Home
                </CButton>
              </CCol>
            </CRow>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default CircuitDirectorySelector;
