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
  CElementCover,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import SignaturePad from "src/components/SiganturePadPaula";
import moment from "moment";

import { useToasts } from "react-toast-notifications";
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
  const state = useSelector((state) => {
    return state.state;
  });
  const { addToast } = useToasts();

  const [currentDate, setCurrentDate] = useState(
    moment().format("MMMM Do YYYY")
  );
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
  const [enableLogs, setEnableLogs] = useState([true, true, true, true]);
  const [timeLogDisabledClass, setTimeLogDisabledClass] = useState([
    null,
    null,
    null,
    null,
  ]);
  useEffect(() => {
    addToast("Clock In Time Registered", {
      appearance: "success",
    });
    api
      .get(GET_TIME_CARD_BY_DAY, {
        params: {
          user_email: "example@email.com",
          entry_date: moment().format("YYYY-MM-DD"),
        },
      })
      .then((result) => {
        console.log("time card info is ", result);
        setTimeCardId(result[0]?.id);
        setJobName(result[0]?.job_name);
        setJobDescription(result[0]?.job_desription);
        setClockInTime(() => {
          let time = result[0]?.clock_in;
          if (time != "") {
            toggleMulti("clockIn");
            return time;
          }
        });
        setClockInAddress(result[0]?.clock_in_gps);
        setClockOutTime(result[0]?.clock_out);
        setClockOutAddress(result[0]?.clock_out_gps);
        setLunchInTime(result[0]?.lunch_in);
        setLunchInAddress(result[0]?.lunch_in_gps);
        setLunchOutTime(result[0]?.lunch_out);
        setLunchOutAddress(result[0]?.lunch_out_gps);

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
  }, []);

  const handleChange = (event) => {
    // updating an object instead of a Map
    setCheckedJobLocations({
      ...checkedJobLocations,
      [event.target.name]: event.target.checked,
      [event.target.name]: event.target.checked,
    });
  };

  const logTime = (type) => {
    let pos = null;
    if (type == "clockIn") pos = 0;
    else if (type == "lunchIn") pos = 1;
    else if (type == "lunchOut") pos = 2;
    else if (type == "clockOut") pos = 3;

    if (enableLogs[pos] != false) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lng = position.coords.longitude;
        var lat = position.coords.latitude;
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
              api
                .post(CLOCK_IN, {
                  data: {
                    time_card_id: timeCardId || "-1",
                    user_email: "example@email.com",
                    entry_date: moment().format("YYYY-MM-DD"),
                    clock_in_time: currentTime,
                    clock_in_gps: address,
                    clock_in_lat: lat,
                    clock_in_lng: lng,
                  },
                })
                .then(() => {
                  toggleMulti(type);
                  addToast("Clock In Time Registered", {
                    appearance: "success",
                  });
                })
                .catch((error) => {
                  console.log(error);
                  addToast("Something went wrong while Cloking In", {
                    appearance: "error",
                  });
                });
              setClockInAddress(address);
              setClockInLatitude(lat);
              setClockInLongitude(lng);
              setClockInTime(currentTime);
              console.log("clock in time ", currentTime);
            } else if (type == "clockOut") {
              api
                .post(CLOCK_OUT, {
                  data: {
                    time_card_id: timeCardId || "-1",
                    user_email: "example@email.com",
                    entry_date: moment().format("YYYY-MM-DD"),
                    clock_in_time: currentTime,
                    clock_in_gps: address,
                    clock_in_lat: lat,
                    clock_in_lng: lng,
                  },
                })
                .then(() => {
                  toggleMulti(type);
                })
                .catch((error) => {
                  console.log(error);
                });
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
    }
  };

  const handleotherJobLocationChange = (event) => {
    console.log("event", event.target.checked);
    setOtherOption(!event.target.checked);
  };

  const toggleMulti = (type) => {
    let newCollapse = collapseMulti.slice();
    let newEnableLogs = enableLogs.slice();
    let newTimeLogDisabledClass = timeLogDisabledClass.slice();
    switch (type) {
      case "clockIn":
        newCollapse[0] = true;
        newEnableLogs[0] = false;
        newTimeLogDisabledClass[0] = "disabledTimeLog";
        break;
      case "lunchIn":
        newCollapse[1] = true;
        newEnableLogs[1] = false;
        newTimeLogDisabledClass[1] = "disabledTimeLog";
        break;
      case "lunchOut":
        newCollapse[2] = true;
        newEnableLogs[2] = false;
        newTimeLogDisabledClass[2] = "disabledTimeLog";
        break;
      case "clockOut":
        newCollapse[3] = true;
        newEnableLogs[3] = false;
        newTimeLogDisabledClass[3] = "disabledTimeLog";
        break;

      default:
    }
    setCollapseMulti(newCollapse);
    setEnableLogs(newEnableLogs);
    setTimeLogDisabledClass(newTimeLogDisabledClass);
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
            className={timeLogDisabledClass[0]}
            id="clockInCard"
          >
            <CCol
              md="12"
              className="timeLog"
              onClick={() => {
                logTime("clockIn");
                // toggleMulti("clockIn");
              }}
            >
              <CIcon width={32} name="cil-clock" /> <p>Clock In</p>
            </CCol>
          </CWidgetIcon>
          {/* <CElementCover
            boundaries={[{ sides: ["top", "left"], query: "#clockInCard" }]}
            opacity="0.8"
          >
            <CSpinner size="5xl" color="success" />
          </CElementCover> */}
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
            className={timeLogDisabledClass[1]}
          >
            <CCol
              md="12"
              className="timeLog"
              onClick={() => {
                //toggleMulti("lunchIn");
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
            className={timeLogDisabledClass[2]}
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
            className={timeLogDisabledClass[3]}
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
