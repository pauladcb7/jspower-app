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
import SignaturePad from "src/components/SiganturePadPaula";
import moment from "moment";

import { api } from "../../helpers/api";
import { JOB_LOCATIONS } from "../../helpers/urls/index";

const TimeCards = () => {
  const [currentDate, setCurrentDate] = useState(
    moment().format("MMMM Do YYYY")
  );
  const [currentTime, setCurrentTime] = useState("");
  const [collapsed, setCollapsed] = React.useState(true);
  const [collapseOther, setCollapseOther] = React.useState(false);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([
    false,
    false,
    false,
    false,
  ]);
  let [jobLocations, setJobLocations] = React.useState([]);
  // const jobLocations = [
  //   { code: "ceres", id: "jLocation1", value: "Ceres" },
  //   { code: "frito-lay", id: "jLocation2", value: "Frito Lay" },
  //   { code: "lodi-bowling", id: "jLocation3", value: "Lodi Bowling" },
  //   { code: "modesto", id: "jLocation4", value: "Modesto" },
  //   { code: "pepsico", id: "jLocation5", value: "PepsiCo" },
  //   {
  //     code: "sensient-livingston",
  //     id: "jLocation6",
  //     value: "Sensient Livingston",
  //   },
  //   { code: "sensient-turlock", id: "jLocation7", value: "Sensient Turlock" },
  // ];
  const [checkedJobLocations, setCheckedJobLocations] = React.useState({});
  const [otherOption, setOtherOption] = React.useState(false);

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   console.log("Latitude is :", position.coords.latitude);
    //   console.log("Longitude is :", position.coords.longitude);
    //   console.log("position is ", position);
    // });
    console.log(JOB_LOCATIONS);
    api
      .get(JOB_LOCATIONS)

      .then((data) => {
        setJobLocations(data);
      })
      .catch(function (error) {
        debugger;
        console.error(error);
      });
  }, [checkedJobLocations]);

  const handleChange = (event) => {
    // updating an object instead of a Map
    setCheckedJobLocations({
      ...checkedJobLocations,
      [event.target.name]: event.target.checked,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeOtherOpt = (event) => {
    // updating an object instead of a Map
    setCollapseOther({
      ...collapseOther,
      [event.target.name]: event.target.checked,
      [event.target.name]: event.target.checked,
    });
  };

  const handleotherJobLocationChange = (event) => {
    console.log("event", event.target.checked);
    setOtherOption(!event.target.checked);
  };

  const logTime = (event) => {
    console.log(event);
  };

  const toggleMulti = (type) => {
    let newCollapse = collapseMulti.slice();
    switch (type) {
      case "clockIn":
        newCollapse[0] = true;
        break;
      case "lunchIn":
        newCollapse[1] = true;
        break;
      case "lunchOut":
        newCollapse[2] = true;
        break;
      case "clockOut":
        newCollapse[3] = true;
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
                {currentDate.toString()}
                <div className="card-header-actions">
                  <CButton
                    color="success"
                    className=" btn-minimize"
                    onClick={() => setCollapsed(!collapsed)}
                    size="sm"
                  >
                    Save
                  </CButton>
                  <CButton
                    color="link"
                    className="card-header-action btn-minimize"
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

                        {jobLocations?.map((jobLocation) => (
                          <CCol md="6" sm="6">
                            <CFormGroup variant="custom-checkbox" inline>
                              <CInputCheckbox
                                custom
                                id={jobLocation.id}
                                name={jobLocation.code}
                                checked={checkedJobLocations[jobLocation.code]}
                                onChange={handleChange}
                              />
                              <CLabel
                                variant="custom-checkbox"
                                htmlFor={jobLocation.id}
                              >
                                {jobLocation.value}
                              </CLabel>
                            </CFormGroup>
                          </CCol>
                        ))}
                        <CCol md="6" sm="6">
                          <CFormGroup variant="custom-checkbox" inline>
                            <CInputCheckbox
                              custom
                              id="otherOption"
                              name="other"
                              onChange={(e) => {
                                setOtherOption(e.target.checked);

                                //debugger;
                              }}
                              /*  onClick={() => {
                                setOtherOption(!therOption);
                                setCollapseOther(true);
                                console.log("ss", otherOption);
                                console.log("aaaaaaa", collapseOther);
                              }} */
                              //onClick={() => setOtherOption(!otherOption)}
                            />
                            <CLabel
                              variant="custom-checkbox"
                              htmlFor="otherOption"
                            >
                              Other
                            </CLabel>
                          </CFormGroup>
                          <CCollapse show={otherOption} timeout={1000}>
                            <CInput
                              id="otherJobLocation"
                              placeholder="Enter Job Location"
                              required
                            />
                          </CCollapse>
                        </CCol>
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
            </CCard>
          </CFade>
        </CCol>
        {/* Log Buttons */}
        <CCol xs="12" sm="6" lg="6">
          <CWidgetIcon
            text={
              <CCol md="12">
                <CIcon name="cil-arrow-left" className="clickArrow" /> Click to
                register Clock In time
              </CCol>
            }
            header={<CCollapse show={collapseMulti[0]}>08:00 a.m.</CCollapse>}
            color="danger"
            iconPadding={false}
            className="logButton"
            onClick={() => {
              toggleMulti("clockIn");
            }}
          >
            <CCol md="12">
              <CCol md="12">
                <CIcon width={32} name="cil-clock" />{" "}
              </CCol>
              <p>Clock In</p>
            </CCol>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="6">
          <CWidgetIcon
            text={
              <CCol md="12">
                <CIcon name="cil-arrow-left" className="clickArrow" /> Click to
                register Lunch In time
              </CCol>
            }
            header={<CCollapse show={collapseMulti[1]}>12:00 p.m.</CCollapse>}
            color="dark"
            iconPadding={false}
            className="logButton"
            onClick={() => {
              toggleMulti("lunchIn");
            }}
          >
            <CCol md="12">
              <CCol md="12">
                <CIcon width={32} name="cil-restaurant" />
              </CCol>
              <p className="text-center" style={{ whiteSpace: "nowrap" }}>
                Lunch In
              </p>
            </CCol>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="6">
          <CWidgetIcon
            text={
              <CCol md="12">
                <CIcon name="cil-arrow-left" className="clickArrow" /> Click to
                register Lunch Out time
              </CCol>
            }
            header={<CCollapse show={collapseMulti[2]}>Lunch Out</CCollapse>}
            color="dark"
            iconPadding={false}
            className="logButton"
            onClick={() => {
              toggleMulti("lunchOut");
            }}
          >
            <CCol md="12">
              <CCol md="12">
                <CIcon width={32} name="cil-restaurant" />
              </CCol>
              <p className="text-center" style={{ whiteSpace: "nowrap" }}>
                Lunch Out
              </p>
            </CCol>
          </CWidgetIcon>
        </CCol>

        <CCol xs="12" sm="6" lg="6">
          <CWidgetIcon
            text={
              <CCol md="12">
                <CIcon name="cil-arrow-left" className="clickArrow" /> Click to
                register Clock Out time
              </CCol>
            }
            header={<CCollapse show={collapseMulti[3]}>08:00 a.m.</CCollapse>}
            color="danger"
            iconPadding={false}
            className="logButton"
            onClick={() => {
              toggleMulti("clockOut");
            }}
          >
            <CCol md="12">
              <CCol md="12">
                <CIcon iconPadding={false} width={32} name="cil-clock" />{" "}
              </CCol>
              <p className="text-center" style={{ whiteSpace: "nowrap" }}>
                Clock Out
              </p>
            </CCol>
          </CWidgetIcon>
        </CCol>

        <CCol xs="12" md="6" lg="4" className="m3">
          <CCard>
            <SignaturePad />
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default TimeCards;
