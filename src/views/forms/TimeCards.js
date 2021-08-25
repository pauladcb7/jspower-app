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

const TimeCards = () => {
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
                Daily Time Card
                <small> - Clock In</small>
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
                        <CLabel htmlFor="jobName">Job Name</CLabel>
                        <CInput
                          id="jobName"
                          placeholder="Enter the Job Name"
                          required
                        />
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel>Job Location</CLabel>
                        </CCol>

                        {jobLocations.map((jobLocation) => (
                          <CCol md="6" sm="6">
                            <CFormGroup variant="custom-checkbox" inline>
                              <CInputCheckbox
                                custom
                                id={jobLocation.key}
                                name={jobLocation.name}
                                checked={checkedJobLocations[jobLocation.name]}
                                onChange={handleChange}
                              />
                              <CLabel
                                variant="custom-checkbox"
                                htmlFor={jobLocation.key}
                              >
                                {jobLocation.label}
                              </CLabel>
                            </CFormGroup>
                          </CCol>
                        ))}
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="textarea-input">
                            Type of work in progress
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="12">
                          <CTextarea
                            name="textarea-input"
                            id="jobDescription"
                            rows="3"
                            placeholder="Enter the type of work in progress..."
                          />
                          <CInvalidFeedback className="help-block">
                            Please provide a valid information
                          </CInvalidFeedback>
                          <CValidFeedback className="help-block">
                            Input provided
                          </CValidFeedback>
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCollapse>
              <CCardFooter>
                <CButton block color="success" type="submit" size="lg">
                  <CIcon size="lg" name="cil-clock" /> Clock In
                </CButton>
              </CCardFooter>
            </CCard>
          </CFade>
        </CCol>
        {/* Log Buttons */}
        <CCol xs="12" sm="6" lg="6">
          <CWidgetIcon
            text={
              <CCol md="12">
                <CIcon name="cil-arrow-left" /> Click to register Clock In time
              </CCol>
            }
            header={<CCollapse show={collapseMulti[1]}>08:00 a.m.</CCollapse>}
            color="success"
            iconPadding={false}
            className="logButton"
            onClick={() => {
              toggleMulti("right");
            }}
          >
            <CCol md="12">
              <CCol md="12">
                <CIcon width={24} name="cil-clock" />{" "}
              </CCol>
              <p>Clock In</p>
            </CCol>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="6">
          <CWidgetIcon
            text={
              <p className="text-center">
                <CIcon name="cil-arrow-left" /> Click to register Lunch In time
              </p>
            }
            header={<CCollapse show={collapseMulti[1]}>12:00 p.m.</CCollapse>}
            color="info"
            iconPadding={false}
            className="logButton"
            onClick={() => {
              toggleMulti("right");
            }}
          >
            <CCol md="12">
              <CCol md="12">
                <CIcon width={32} name="cil-clock" />
              </CCol>
              <p className="text-center">Lunch In</p>
            </CCol>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="6">
          <CWidgetIcon
            text={
              <CCol md="12">
                <CIcon name="cil-arrow-left" /> Click to register Lunch Out time
              </CCol>
            }
            header={<CCollapse show={collapseMulti[1]}>Lunch Out</CCollapse>}
            color="info"
            iconPadding={false}
            className="logButton"
            onClick={() => {
              toggleMulti("right");
            }}
          >
            <CCol md="12">
              <CCol md="12">
                <CIcon width={24} name="cil-restaurant" />
              </CCol>
              <p>Lunch Out</p>
            </CCol>
          </CWidgetIcon>
        </CCol>

        <CCol xs="12" sm="6" lg="6">
          <CWidgetIcon
            text={
              <CCol md="12">
                <CIcon name="cil-arrow-left" /> Click to register Clock Out time
              </CCol>
            }
            header={<CCollapse show={collapseMulti[1]}>08:00 a.m.</CCollapse>}
            color="success"
            iconPadding={false}
            className="logButton"
            onClick={() => {
              toggleMulti("right");
            }}
          >
            <CCol md="12">
              <CCol md="12">
                <CIcon iconPadding={false} width={24} name="cil-clock" />{" "}
              </CCol>
              <p>Clock Out</p>
            </CCol>
          </CWidgetIcon>
        </CCol>

        {/* Lunch In */}
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                Daily Time Card
                <small> - Lunch In</small>
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
                        <CLabel htmlFor="jobName">Job Name</CLabel>
                        <CInput
                          id="jobName"
                          placeholder="Enter the Job Name"
                          required
                        />
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel>Job Location</CLabel>
                        </CCol>

                        {jobLocations.map((jobLocation) => (
                          <CCol md="6" sm="6">
                            <CFormGroup variant="custom-checkbox" inline>
                              <CInputCheckbox
                                custom
                                id={jobLocation.key}
                                name={jobLocation.name}
                                checked={checkedJobLocations[jobLocation.name]}
                                onChange={handleChange}
                              />
                              <CLabel
                                variant="custom-checkbox"
                                htmlFor={jobLocation.key}
                              >
                                {jobLocation.label}
                              </CLabel>
                            </CFormGroup>
                          </CCol>
                        ))}
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol md="12">
                          <CLabel htmlFor="textarea-input">
                            Type of work in progress
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="12">
                          <CTextarea
                            name="textarea-input"
                            id="jobDescription"
                            rows="3"
                            placeholder="Enter the type of work in progress..."
                          />
                          <CInvalidFeedback className="help-block">
                            Please provide a valid information
                          </CInvalidFeedback>
                          <CValidFeedback className="help-block">
                            Input provided
                          </CValidFeedback>
                        </CCol>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCollapse>
              <CCardFooter>
                <CButton block color="success" type="submit" size="lg">
                  <CIcon size="lg" name="cil-clock" /> Clock In
                </CButton>
              </CCardFooter>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default TimeCards;
