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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import ESignature from "src/components/SiganturePadPaula";

const WorkOrder = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const jobLocations = [
    { name: "ceres", key: "jLocation1", label: "Ceres" },
    { name: "frito-lay", key: "jLocation2", label: "Frito Lay" },
    { name: "lodi-bowling", key: "jLocation3", label: "Lodi Bowling" },
    { name: "modesto", key: "jLocation4", label: "Modesto" },
    { name: "pepsico", key: "jLocation5", label: "PepsiCo" },
    {
      name: "sensient-livingston",
      key: "jLocation6",
      label: "Sensient Livingston",
    },
    { name: "sensient-turlock", key: "jLocation7", label: "Sensient Turlock" },
    { name: "Other", key: "jLocation8", label: "Other" },
  ];
  const [checkedJobLocations, setCheckedJobLocations] = React.useState({});

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
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                Work Order
                <div className="card-header-actions">
                  <CButton
                    color="link"
                    className="card-header-action btn-minimize"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <CIcon
                      name={collapsed ? "cil-arrow-top" : "cil-arrow-bottom"}
                    />
                  </CButton>
                </div>
              </CCardHeader>
              <CCollapse show={collapsed} timeout={1000}>
                <CCardBody>
                  <CRow>
                    <CCol sm="12">
                      <CFormGroup>
                        <CLabel htmlFor="jobName">Date</CLabel>
                        <CInput
                          type="date"
                          id="date-input"
                          name="date-input"
                          placeholder="Date"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="jobName">Type of work</CLabel>
                        <CCol>
                          <CFormGroup variant="checkbox">
                            <CInputRadio
                              className="form-check-input"
                              id="radio1"
                              name="radios"
                              value="option1"
                            />
                            <CLabel variant="checkbox" htmlFor="radio1">
                              Service Call
                            </CLabel>
                          </CFormGroup>
                          <CFormGroup variant="checkbox">
                            <CInputRadio
                              className="form-check-input"
                              id="radio2"
                              name="radios"
                              value="option2"
                            />
                            <CLabel variant="checkbox" htmlFor="radio2">
                              Extra
                            </CLabel>
                          </CFormGroup>
                          <CFormGroup variant="checkbox">
                            <CInputRadio
                              className="form-check-input"
                              id="radio3"
                              name="radios"
                              value="option3"
                            />
                            <CLabel variant="checkbox" htmlFor="radio3">
                              Other
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                      </CFormGroup>

                      <CFormGroup>
                        <CLabel htmlFor="employeeName">Employee Name</CLabel>
                        <CInput
                          
                          type="text"
                          id="input-small"
                          name="input-small"
                          className="input-sm"
                          placeholder="Employee Name"
                        />
                      </CFormGroup>

                      <CFormGroup>
                        <CLabel htmlFor="jobName">Start Time</CLabel>
                        <CInput
                          type="time"
                          id="date-input"
                          name="date-input"
                          placeholder="Start Time"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="jobName">End Time</CLabel>
                        <CInput
                          type="time"
                          id="date-input"
                          name="date-input"
                          placeholder="End Time"
                        />
                      </CFormGroup>

                      <CFormGroup>
                        <CLabel htmlFor="employeeName">Job Location</CLabel>
                        <CInput
                          
                          type="text"
                          id="input-small"
                          name="input-small"
                          className="input-sm"
                          placeholder="Job Location"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="employeeName">Job Details</CLabel>
                        <CTextarea
                          name="textarea-input"
                          id="jobDescription"
                          rows="3"
                          placeholder="Type Here..."
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="employeeName">Total Cost</CLabel>
                        <CInput
                          
                          type="text"
                          id="input-small"
                          name="input-small"
                          className="input-sm"
                          placeholder="Total Cost"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="employeeName">Full Name</CLabel>
                        <CInput
                          
                          type="text"
                          id="input-small"
                          name="input-small"
                          className="input-sm"
                          placeholder="Full Name"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="employeeName">Phone Number</CLabel>
                        <CInput
                          
                          type="text"
                          id="input-small"
                          name="input-small"
                          className="input-sm"
                          placeholder="Phone Number"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="employeeName">
                          Customer Signature
                        </CLabel>
                        <ESignature></ESignature>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="employeeName">
                          Employee Signature
                        </CLabel>
                        <ESignature></ESignature>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCollapse>
              <CCardFooter>
                <CButton block color="success" type="submit" size="lg">
                  <CIcon size="lg" name="cil-clock" /> Save
                </CButton>
              </CCardFooter>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default WorkOrder;
