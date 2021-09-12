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
import {
  JOB_LOCATIONS,
  GET_TIME_CARD_BY_DAY,
  CLOCK_IN,
  CLOCK_OUT,
  LUNCH_IN,
  LUNCH_OUT,
} from "../../helpers/urls/index";
import { useSelector, useStore } from "react-redux";

const TimeCards = () => {
  const [currentDate, setCurrentDate] = useState(
    moment().format("MMMM Do YYYY")
  );

  const state = useSelector((state) => {
    console.log(state);
    debugger;
    return state.state;
  });

  const [jobName, setJobName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [otherJobLocation, setOtherJobLocation] = useState("");
  const [timeCardId, setTimeCardId] = useState("");

  const [collapsed, setCollapsed] = React.useState(true);
  const [collapseOther, setCollapseOther] = React.useState(false);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [jobLocations, setJobLocations] = React.useState([
    {
      id: 1,
      value: "Ceres",
      code: "CERES",
    },
    {
      id: 2,
      value: "Frito Lay",
      code: "FRITO_LAY",
    },
    {
      id: 4,
      value: "Lodi Bowling",
      code: "LODI_BOWLING",
    },
    {
      id: 3,
      value: "Modesto",
      code: "MODESTO",
    },
    {
      id: 7,
      value: "PepsiCo",
      code: "PEPSICO",
    },
    {
      id: 5,
      value: "Sensient Livingston",
      code: "SENSIENT_LIVINGSTON",
    },
    {
      id: 6,
      value: "Sensient Turlock",
      code: "SENSIENT_TURLOCK",
    },
  ]);
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [clockInTime, setClockInTime] = useState("");
  const [clockInLatitude, setClockInLatitude] = React.useState(null);
  const [clockInLongitude, setClockInLongitude] = React.useState(null);
  const [clockInAddress, setClockInAddress] = React.useState("");
  const [clockOutTime, setClockOutTime] = useState("");
  const [clockOutLatitude, setClockOutLatitude] = React.useState(null);
  const [clockOutLongitude, setClockOutLongitude] = React.useState(null);
  const [clockOutAddress, setClockOutAddress] = React.useState("");
  const [lunchInTime, setLunchInTime] = useState("");
  const [lunchInLatitude, setLunchInLatitude] = React.useState(null);
  const [lunchInLongitude, setLunchInLongitude] = React.useState(null);
  const [lunchInAddress, setLunchInAddress] = React.useState("");
  const [lunchOutTime, setLunchOutTime] = useState("");
  const [lunchOutLatitude, setLunchOutLatitude] = React.useState(null);
  const [lunchOutLongitude, setLunchOutLongitude] = React.useState(null);
  const [lunchOutAddress, setLunchOutAddress] = React.useState("");
  const [checkedJobLocations, setCheckedJobLocations] = React.useState({});
  const [otherOption, setOtherOption] = React.useState(false);

  useEffect(() => {
    api
      .get(GET_TIME_CARD_BY_DAY, {
        params: {
          user_email: "example@email.com",
          entry_date: moment().format("YYYY-MM-DD"),
        },
      })
      .then((result) => {
        console.log("time card info is ", result);
        setJobName(result?.job_name);
        setJobDescription(result?.job_desription);
        setClockInTime(result?.clock_in);
        setClockInAddress(result?.clock_in_gps);
        setClockOutTime(result?.clock_out);
        setClockOutAddress(result?.clock_out_gps);
        setLunchInTime(result?.lunch_in);
        setLunchInAddress(result?.lunch_in_gps);
        setLunchOutTime(result?.lunch_out);
        setLunchOutAddress(result?.lunch_out_gps);

        api
          .get(JOB_LOCATIONS)
          .then((data) => {
            setJobLocations(data);
          })
          .then(() => {});
      })

      .catch(function (error) {
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

  const logTime = (type) => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lng = position.coords.longitude;
      let lat = position.coords.latitude;
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_API_KEY}`,
        {
          method: "GET",
          headers: {},
        }
      )
        .then((response) => response.json())
        .then((response) => {
          let address = response.results[0]?.formatted_address;
          let currentTime = moment().format("hh:mm A");
          console.log(moment().format("YYYY-MM-DD"));

          if (type == "clockIn") {
            api.post(CLOCK_IN, {
              params: {
                time_card_id: timeCardId || "-1",
                user_email: "example@email.com",
                entry_date: "2021-09-08",
                lunch_out_time: "2021-10-07T01:41:10.436Z",
                lunch_out_gps: "2020 Oakdale Dr, Modesto, CA, USA",
                lunch_out_lat: "-33.25485545",
                lunch_out_lng: "12.25687465",
              },
            });
            setClockInAddress(address);
            setClockInLatitude(lat);
            setClockInLongitude(lng);
            setClockInTime(currentTime);
            console.log("clock in time ", currentTime);
          } else if (type == "clockOut") {
            setClockOutAddress(address);
            setClockOutLatitude(lat);
            setClockOutLongitude(lng);
            setClockOutTime(currentTime);
          } else if (type == "lunchIn") {
            setLunchInAddress(address);
            setLunchInLatitude(lat);
            setLunchInLongitude(lng);
            setLunchInTime(currentTime);
            console.log("lunch in time ", currentTime);
          } else if (type == "lunchOut") {
            setLunchOutAddress(address);
            setLunchOutLatitude(lat);
            setLunchOutLongitude(lng);
            setLunchOutTime(currentTime);
          }
        })
        .catch((err) => console.log(err));
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
                          value={jobName}
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
                              }}
                              value={otherOption}
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
                              value={otherJobLocation}
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
                            value={jobDescription}
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
              <div>
                {clockInAddress || (
                  <div>
                    <CIcon name="cil-arrow-left" className="clickArrow" /> Click
                    to register Clock In time
                  </div>
                )}
              </div>
            }
            header={
              <CCollapse timeout={2000} show={collapseMulti[0]}>
                {clockInTime}
              </CCollapse>
            }
            color="danger"
            iconPadding={false}
            className="logButton"
          >
            <CCol
              md="12"
              className="timeLog"
              onClick={() => {
                toggleMulti("clockIn");
                logTime("clockIn");
              }}
            >
              <CIcon width={32} name="cil-clock" /> <p>Clock In</p>
            </CCol>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="6">
          <CWidgetIcon
            text={
              <div>
                {lunchInAddress || (
                  <div>
                    <CIcon name="cil-arrow-left" className="clickArrow" /> Click
                    to register Lunch In time
                  </div>
                )}
              </div>
            }
            header={
              <CCollapse timeout={2000} show={collapseMulti[1]}>
                {lunchInTime}
              </CCollapse>
            }
            color="dark"
            iconPadding={false}
            className="logButton"
          >
            <CCol
              md="12"
              className="timeLog"
              onClick={() => {
                toggleMulti("lunchIn");
                logTime("lunchIn");
              }}
            >
              <CIcon width={32} name="cil-restaurant" />
              <p>Lunch In</p>
            </CCol>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="6">
          <CWidgetIcon
            text={
              <div>
                {lunchOutAddress || (
                  <div>
                    <CIcon name="cil-arrow-left" className="clickArrow" /> Click
                    to register Lunch Out time
                  </div>
                )}
              </div>
            }
            header={
              <CCollapse timeout={2000} show={collapseMulti[2]}>
                {lunchOutTime}
              </CCollapse>
            }
            color="dark"
            iconPadding={false}
            className="logButton"
          >
            <CCol
              md="12"
              className="timeLog"
              onClick={() => {
                toggleMulti("lunchOut");
                logTime("lunchOut");
              }}
            >
              <CIcon width={32} name="cil-restaurant" />
              <p>LunchOut</p>
            </CCol>
          </CWidgetIcon>
        </CCol>

        <CCol xs="12" sm="6" lg="6">
          <CWidgetIcon
            text={
              <div>
                {clockOutAddress || (
                  <div>
                    <CIcon name="cil-arrow-left" className="clickArrow" /> Click
                    to register Clock Out time
                  </div>
                )}
              </div>
            }
            header={
              <CCollapse timeout={2000} show={collapseMulti[3]}>
                {clockOutTime}
              </CCollapse>
            }
            color="danger"
            iconPadding={false}
            className="logButton"
          >
            <CCol
              md="12"
              className="timeLog"
              onClick={() => {
                toggleMulti("clockOut");
                logTime("clockOut");
              }}
            >
              <CIcon iconPadding={false} width={32} name="cil-clock" />{" "}
              <p>Clock Out</p>
            </CCol>
          </CWidgetIcon>
        </CCol>
        {moment().format("dddd") == "Friday" ||
        moment().format("dddd") == "Saturday" ||
        moment().format("dddd") == "Sunday" ? (
          <CCol xs="12" md="12" lg="12" className="m3">
            <CCard>
              <CCardBody>
                <CFormGroup row>
                  <CCol md="12">
                    <CLabel>Signature</CLabel>
                    <SignaturePad />
                  </CCol>
                </CFormGroup>
              </CCardBody>
            </CCard>
          </CCol>
        ) : (
          <p></p>
        )}
      </CRow>
    </>
  );
};

export default TimeCards;
