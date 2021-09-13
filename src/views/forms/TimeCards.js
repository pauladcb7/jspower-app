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
  CREATE_TIME_CARD,
} from "../../helpers/urls/index";
import { useSelector, useStore } from "react-redux";
import { Field, Form } from "react-final-form";

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

  const required = (value) => (value ? undefined : "Required");
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
  const [allWeek, setAllWeek] = useState(false);

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
        setTimeCardId(result[0]?.id);
        setJobName(result[0]?.job_name);
        setJobDescription(result[0]?.job_desription);
        let time = result[0]?.clock_in;

        let showTime = [false, false, false, false];
        let cardState = [true, true, true, true];
        if (time != undefined) {
          setClockInTime(time);
          showTime[0] = true;
          cardState[0] = false;
        }
        setClockInAddress(result[0]?.clock_in_gps);
        time = result[0]?.clock_out;
        if (time != undefined) {
          showTime[3] = true;
          cardState[3] = false;
          setClockOutTime(time);
        }

        setClockOutAddress(result[0]?.clock_out_gps);
        time = result[0]?.lunch_in;
        if (time != undefined) {
          showTime[1] = true;
          cardState[1] = false;
          setLunchInTime(time);
        }
        setLunchInAddress(result[0]?.lunch_in_gps);
        time = result[0]?.lunch_out;
        if (time != undefined) {
          showTime[2] = true;
          cardState[2] = false;
          setLunchOutTime(time);
        }
        setCollapseMulti(showTime);
        setLunchOutAddress(result[0]?.lunch_out_gps);
        setEnableLogs(cardState);
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

  const saveChanges = () => {};
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
                    autoDismiss: true,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  addToast("Something went wrong while Cloking In", {
                    appearance: "error",
                    autoDismiss: true,
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
                    clock_out_time: currentTime,
                    clock_out_gps: address,
                    clock_out_lat: lat,
                    clock_out_lng: lng,
                  },
                })
                .then(() => {
                  toggleMulti(type);
                  addToast("Clock Out Time Registered", {
                    appearance: "success",
                    autoDismiss: true,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  addToast("Something went wrong while Cloking Out", {
                    appearance: "error",
                    autoDismiss: true,
                  });
                });
              setClockOutAddress(address);
              setClockOutLatitude(lat);
              setClockOutLongitude(lng);
              setClockOutTime(currentTime);
            } else if (type == "lunchIn") {
              api
                .post(LUNCH_IN, {
                  data: {
                    time_card_id: timeCardId || "-1",
                    user_email: "example@email.com",
                    entry_date: moment().format("YYYY-MM-DD"),
                    lunch_in_time: currentTime,
                    lunch_in_gps: address,
                    lunch_in_lat: lat,
                    lunch_in_lng: lng,
                  },
                })
                .then(() => {
                  toggleMulti(type);
                  addToast("Lunch In Time Registered", {
                    appearance: "success",
                    autoDismiss: true,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  addToast("Something went wrong while Lunching In", {
                    appearance: "error",
                    autoDismiss: true,
                  });
                });
              setLunchInAddress(address);
              setLunchInLatitude(lat);
              setLunchInLongitude(lng);
              setLunchInTime(currentTime);
              console.log("lunch in time ", currentTime);
            } else if (type == "lunchOut") {
              api
                .post(LUNCH_OUT, {
                  data: {
                    time_card_id: timeCardId || "-1",
                    user_email: "example@email.com",
                    entry_date: moment().format("YYYY-MM-DD"),
                    lunch_out_time: currentTime,
                    lunch_out_gps: address,
                    lunch_out_lat: lat,
                    lunch_out_lng: lng,
                  },
                })
                .then(() => {
                  toggleMulti(type);
                  addToast("Lunch Out Time Registered", {
                    appearance: "success",
                    autoDismiss: true,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  addToast("Something went wrong while Lunching Out", {
                    appearance: "error",
                    autoDismiss: true,
                  });
                });
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
    switch (type) {
      case "clockIn":
        console.log("toggle clock in.....");
        newCollapse[0] = true;
        newEnableLogs[0] = false;
        break;
      case "lunchIn":
        newCollapse[1] = true;
        newEnableLogs[1] = false;
        break;
      case "lunchOut":
        newCollapse[2] = true;
        newEnableLogs[2] = false;
        break;
      case "clockOut":
        newCollapse[3] = true;
        newEnableLogs[3] = false;
        break;

      default:
    }
    setCollapseMulti(newCollapse);
    setEnableLogs(newEnableLogs);
  };

  const RenderLogCards = () => {
    var format = "hh:mm:ss";
    var cIn = moment().isBetween(
      moment("18:50:00", format),
      moment("18:58:00", format)
    );
    var cOut = moment().isBetween(
      moment("18:50:00", format),
      moment("19:58:00", format)
    );
    var lIn = moment().isBetween(
      moment("18:50:00", format),
      moment("19:58:00", format)
    );
    var lOut = moment().isBetween(
      moment("18:50:00", format),
      moment("19:58:00", format)
    );

    if (cIn || cOut || lIn || lOut) {
      return (
        <>
          {cIn && (
            <CCol xs="12" sm="6" lg="6">
              <CWidgetIcon
                text={
                  <div>
                    {clockInAddress || (
                      <div>
                        <CIcon name="cil-arrow-left" className="clickArrow" />{" "}
                        Click to register Clock In time
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
                id="clockInCard"
              >
                <CCol
                  md="12"
                  className="timeLog"
                  onClick={() => {
                    logTime("clockIn");
                  }}
                >
                  <CIcon width={32} name="cil-clock" /> <p>Clock In</p>
                </CCol>
              </CWidgetIcon>
            </CCol>
          )}
          {lIn && (
            <CCol xs="12" sm="6" lg="6">
              <CWidgetIcon
                text={
                  <div>
                    {lunchInAddress || (
                      <div>
                        <CIcon name="cil-arrow-left" className="clickArrow" />{" "}
                        Click to register Lunch In time
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
              >
                <CCol
                  md="12"
                  className="timeLog"
                  onClick={() => {
                    logTime("lunchIn");
                  }}
                >
                  <CIcon width={32} name="cil-restaurant" />
                  <p>Lunch In</p>
                </CCol>
              </CWidgetIcon>
            </CCol>
          )}
          {lOut && (
            <CCol xs="12" sm="6" lg="6">
              <CWidgetIcon
                text={
                  <div>
                    {lunchOutAddress || (
                      <div>
                        <CIcon name="cil-arrow-left" className="clickArrow" />{" "}
                        Click to register Lunch Out time
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
              >
                <CCol
                  md="12"
                  className="timeLog"
                  onClick={() => {
                    logTime("lunchOut");
                  }}
                >
                  <CIcon width={32} name="cil-restaurant" />
                  <p>LunchOut</p>
                </CCol>
              </CWidgetIcon>
            </CCol>
          )}
          {cOut && (
            <CCol xs="12" sm="6" lg="6">
              <CWidgetIcon
                text={
                  <div>
                    {clockOutAddress || (
                      <div>
                        <CIcon name="cil-arrow-left" className="clickArrow" />{" "}
                        Click to register Clock Out time
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
              >
                <CCol
                  md="12"
                  className="timeLog"
                  onClick={() => {
                    logTime("clockOut");
                  }}
                >
                  <CIcon iconPadding={false} width={32} name="cil-clock" />{" "}
                  <p>Clock Out</p>
                </CCol>
              </CWidgetIcon>
            </CCol>
          )}
        </>
      );
    } else {
      return (
        <CCol md="12">
          <CCard className="text-center p-1">
            <h4>You can't log time.</h4>
            <h6>If you miss loggin time today. Contact HR.</h6>
          </CCard>
        </CCol>
      );
    }
    let cards = null;
    return cards;
  };

  const onSubmit = function (e) {
    debugger;
    api
      .post(CREATE_TIME_CARD, {
        data: {
          time_card_id: timeCardId || "-1",
          user_email: "example@email.com",
          entry_date: moment().format("YYYY-MM-DD"),
          job_name: jobName,
          job_locations: jobLocations,
          job_description: jobDescription,
          other: otherJobLocation,
          all_week_ind: allWeek,
        },
      })
      .then((result) => {
        addToast("Time Card Saved.", {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .catch((error) => {
        console.log(error);
        addToast("Something went wrong getting Time Card data.", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  const validate = function (e) {
    //signaturePad.isEmpty()
  };

  return (
    <>
      <CRow>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <CCol xs="12" sm="12">
                <CFade timeout={300} in={showElements} unmountOnExit={true}>
                  <CCard>
                    <CCardHeader>
                      {currentDate.toString()}
                      <div className="card-header-actions">
                        <CButton
                          color="success"
                          className=" btn-minimize"
                          size="sm"
                          type="submit"
                        >
                          Save
                        </CButton>
                        <CButton
                          color="link"
                          className="card-header-action btn-minimize"
                          onClick={() => setCollapsed(!collapsed)}
                        >
                          <CIcon
                            name={
                              collapsed ? "cil-arrow-top" : "cil-arrow-bottom"
                            }
                          />
                        </CButton>
                      </div>
                    </CCardHeader>
                    <CCollapse show={collapsed} timeout={1000}>
                      <CCardBody>
                        <CRow>
                          <CCol sm="12">
                            <Field name="employeeName" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="employeeName">
                                      Employee Name
                                    </CLabel>
                                    <CInput
                                      {...input}
                                      invalid={meta.invalid && meta.touched}
                                      placeholder="Employee Name"
                                    />
                                    {meta.touched && meta.error && (
                                      <CInvalidFeedback className="help-block">
                                        Please provide a valid information
                                      </CInvalidFeedback>
                                    )}
                                  </CFormGroup>
                                </>
                              )}
                            </Field>
                            <Field name="jobName" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="jobName">Job Name</CLabel>
                                    <CInput
                                      placeholder="Enter the Job Name"
                                      {...input}
                                      invalid={meta.invalid && meta.touched}
                                    />
                                    {meta.touched && meta.error && (
                                      <CInvalidFeedback className="help-block">
                                        Please provide a valid information
                                      </CInvalidFeedback>
                                    )}
                                  </CFormGroup>
                                </>
                              )}
                            </Field>
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
                                      checked={
                                        checkedJobLocations[jobLocation.code]
                                      }
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
                                  onChange={(e) => {
                                    setJobDescription(e.target.value);
                                  }}
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
            </form>
          )}
        />
        {/* Log Buttons */}
        <RenderLogCards />
        {/* <CCol xs="12" sm="6" lg="6">
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
        </CCol> */}
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
