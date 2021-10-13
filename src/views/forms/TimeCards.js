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
  CListGroup,
  CListGroupItem,
  CBadge,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import ESignature from "src/components/SiganturePadPaula";
import SignaturePad from "src/components/SiganturePadPaula";
import moment from "moment";

import { useToasts } from "react-toast-notifications";
import { api } from "../../helpers/api";
import {
  JOB_LOCATIONS,
  SAVE_TIME_CARD,
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
  const [initialValues, setInitialValue] = useState({});

  const [currentDate, setCurrentDate] = useState(
    moment().format("dddd, MMMM Do, YYYY")
  );
  const [jobName, setJobName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [otherJobLocation, setOtherJobLocation] = useState("");
  const [timeCardId, setTimeCardId] = useState("");
  const [timeEntryId, setTimeEntryId] = useState("");

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
  const [timeCardStatus, setTimeCardStatus] = useState("NEW");
  const [timeCardsLogged, setTimeCardsLogged] = useState([]);
  const [employeeSignature, setEmployeeSignature] = useState(null);
  const [weekClosed, setWeekClosed] = useState(null);

  useEffect(() => {
    api
      .get(GET_TIME_CARD_BY_DAY, {
        params: {
          time_entry_id: timeEntryId,
          time_card_id: timeCardId,
          entry_date: moment().format("YYYY-MM-DD"),
        },
      })
      .then((result) => {
        console.log("time card info is", result);
        let timeCardInfo = result.time_card_info;
        let timeEntryInfo = result.time_entry_info;
        setTimeEntryId(timeEntryInfo.id);
        setEmployeeSignature(result.time_card_info?.esignature);
        setTimeCardsLogged(result.time_cards_logged);
        setWeekClosed(result.week_closed_ind);
        if (timeCardInfo && result.week_closed_ind == "OPEN") {
          setTimeCardId(timeCardInfo.time_card_id);
          setTimeCardStatus(timeCardInfo.status);
          setJobName(timeCardInfo.job_name);
          setJobDescription(timeCardInfo.job_desription);

          let showTime = [false, false, false, false];
          let cardState = [true, true, true, true];
          // Clock In
          let time = timeCardInfo.clock_in;
          if (time != undefined) {
            setClockInTime(time);
            showTime[0] = true;
            cardState[0] = false;
          }
          setClockInAddress(timeCardInfo.clock_in_gps);
          // Clock Out
          time = timeCardInfo.clock_out;
          if (time != undefined) {
            showTime[3] = true;
            cardState[3] = false;
            setClockOutTime(time);
          }
          setClockOutAddress(timeCardInfo.clock_out_gps);
          //Lunch In
          time = timeEntryInfo.lunch_in;
          if (time != undefined) {
            showTime[1] = true;
            cardState[1] = false;
            setLunchInTime(time);
          }
          setLunchInAddress(timeEntryInfo.lunch_in_gps);
          time = timeEntryInfo.lunch_out;
          if (time != undefined) {
            showTime[2] = true;
            cardState[2] = false;
            setLunchOutTime(time);
          }
          setLunchOutAddress(timeEntryInfo.lunch_out_gps);
          setCollapseMulti(showTime);
          setEnableLogs(cardState);
          setInitialValue({
            jobName: timeCardInfo.job_name,
            jobLocations: result.job_locations.map(function (jl) {
              return jl.job_location_rc;
            }),
            jobDescription: timeCardInfo.job_description,
            otherJobLocation: timeCardInfo.other,
            otherCheckbox: timeCardInfo.other ? ["other"] : [],
            signature: timeCardInfo.esignature,
          });
          api
            .get(JOB_LOCATIONS)
            .then((data) => {
              setJobLocations(data);
            })
            .catch((error) => {
              console.log(error);
              addToast(
                "Something went wrong loading Job Locations. Refresh the page.",
                {
                  appearance: "error",
                  autoDismiss: true,
                }
              );
            });
        }
      })

      .catch(function (error) {
        addToast("Something went wrong loading Time Card. Refresh the page.", {
          appearance: "error",
          autoDismiss: true,
        });
        console.error(error);
      });
  }, [timeEntryId, timeCardId, timeCardStatus]);

  const Required = () => {
    return <span style={{ color: "red" }}>*</span>;
  };

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
    if (timeEntryId) {
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
            let currentTime = moment().format("HH:mm");

            if (type == "clockIn" && collapseMulti[0] == false) {
              api
                .post(CLOCK_IN, {
                  data: {
                    time_card_id: timeCardId || "-1",
                    entry_date: moment().format("YYYY-MM-DD"),
                    clock_in_time: currentTime,
                    clock_in_gps: address,
                    clock_in_lat: lat,
                    clock_in_lng: lng,
                  },
                })
                .then((result) => {
                  toggleMulti(type);
                  setTimeCardStatus(result.time_card_status);
                  addToast("Clock In Time Registered", {
                    appearance: "success",
                    autoDismiss: true,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  addToast("Something went wrong while Clocking In", {
                    appearance: "error",
                    autoDismiss: true,
                  });
                });
              setClockInAddress(address);
              setClockInLatitude(lat);
              setClockInLongitude(lng);
              setClockInTime(currentTime);
            } else if (type == "clockOut" && collapseMulti[3] == false) {
              api
                .post(CLOCK_OUT, {
                  data: {
                    time_card_id: timeCardId || "-1",
                    entry_date: moment().format("YYYY-MM-DD"),
                    clock_out_time: currentTime,
                    clock_out_gps: address,
                    clock_out_lat: lat,
                    clock_out_lng: lng,
                  },
                })
                .then((result) => {
                  toggleMulti(type);
                  setTimeCardStatus(result.time_card_status);

                  addToast("Clock Out Time Registered", {
                    appearance: "success",
                    autoDismiss: true,
                  });
                  setInitialValue({
                    jobName: null,
                    jobLocations: [],
                    jobDescription: null,
                    otherJobLocation: null,
                    otherCheckbox: null,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  addToast("Something went wrong while Clocking Out", {
                    appearance: "error",
                    autoDismiss: true,
                  });
                });
              setClockOutAddress(address);
              setClockOutLatitude(lat);
              setClockOutLongitude(lng);
              setClockOutTime(currentTime);
            } else if (type == "lunchIn" && collapseMulti[1] == false) {
              api
                .post(LUNCH_IN, {
                  data: {
                    time_card_id: timeCardId || "-1",
                    time_entry_id: timeEntryId || "-1",
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
            } else if (type == "lunchOut" && collapseMulti[2] == false) {
              api
                .post(LUNCH_OUT, {
                  data: {
                    time_card_id: timeCardId || "-1",
                    time_entry_id: timeEntryId || "-1",
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
    } else {
      addToast("Fill the Time Card information and Save it before Clock In.", {
        appearance: "warning",
        autoDismiss: true,
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
  const LogCards = () => {
    if (timeCardId) {
      return (
        <>
          {(timeCardStatus == "NEW" || timeCardStatus == undefined) && (
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
          {timeCardStatus == "CLOCK_IN" && (
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
      return null;
    }
  };
  const onReadySignature = function (signaturePad) {
    setEmployeeSignature(signaturePad);
  };

  const RenderLogCards = () => {
    var format = "HH:mm:ss";
    var cIn = moment().isBetween(
      moment("08:00:00", format),
      moment("08:59:59", format)
    );
    var cOut = moment().isBetween(
      moment("13:00:00", format),
      moment("17:59:00", format)
    );
    var lIn = lunchInTime.length == 0;
    var lOut = lunchOutTime.length == 0;

    if (lIn || lOut) {
      return (
        <>
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
        </>
      );
    } else {
      return null;
    }
    let cards = null;
    return cards;
  };

  const onSubmit = async (e) => {
    api
      .post(SAVE_TIME_CARD, {
        data: {
          time_card_id: timeCardId || "-1",
          time_entry_id: timeEntryId || "-1",
          entry_date: moment().format("YYYY-MM-DD"),
          job_name: e.jobName,
          job_locations: e.jobLocations,
          job_description: e.jobDescription,
          other: e.otherCheckbox?.length == 0 ? "" : e.otherJobLocation,
          all_week_ind: allWeek,
          esignature: e.signature,
        },
      })
      .then(async (result) => {
        const timeEntry = await setTimeEntryId(result.timeEntryId);
        const timeCard = await setTimeCardId(result.timeCardId);
        addToast("Time Card Saved.", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((error) => {
        console.log(error);
        addToast("Something went wrong saving Time Card information.", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  const RenderTimeCardsLogged = () => {
    return (
      <>
        {timeCardsLogged.length !== 0 ? (
          <CRow>
            <CCol xs="12" md="12" lg="12">
              <CCard>
                <CCardHeader>Time Logged</CCardHeader>
                <CListGroup>
                  {timeCardsLogged.map((tc) => {
                    return (
                      <CListGroup>
                        <CListGroupItem className="justify-content-between">
                          {tc.job_name}
                          <CBadge
                            className="float-right"
                            shape="pill"
                            color="danger"
                          >
                            {tc.clock_out}
                          </CBadge>
                          <p className="float-right mr-2"></p>
                          {tc.clock_out == null ? (
                            <p className="float-right mr-5"></p>
                          ) : null}
                          <CBadge
                            className="float-right"
                            shape="pill"
                            color="dark"
                          >
                            {tc.clock_in}
                          </CBadge>
                        </CListGroupItem>
                      </CListGroup>
                    );
                  })}
                </CListGroup>
              </CCard>
            </CCol>
          </CRow>
        ) : (
          <p></p>
        )}
      </>
    );
  };
  const validate = function (e) {
    //signaturePad.isEmpty()
    const errors = {};

    if (!e.jobLocations || (e.jobLocations && e.jobLocations.length == 0)) {
      if (
        e.jobLocations?.length == 0 &&
        //!e.otherJobLocation &&
        e.otherCheckbox?.length == 0
      ) {
        errors.jobLocations = "required";
      }
    }
    if (e.otherCheckbox?.length > 0 && !e.otherJobLocation) {
      errors.otherJobLocation = "required";
    }
    if (timeCardStatus) return errors;
  };

  return (
    <>
      {weekClosed != "CLOSED" ? (
        <>
          <CRow>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              initialValues={initialValues}
              render={({ handleSubmit, valid, values, errors }) => (
                <form onSubmit={handleSubmit}>
                  <CCol xs="12" sm="12">
                    <CFade timeout={300} in={showElements} unmountOnExit={true}>
                      <CCard>
                        {/* {JSON.stringify(values)}
                        {JSON.stringify(errors)} */}
                        <CCardHeader>
                          {currentDate.toString()}
                          <div className="card-header-actions">
                            <CButton
                              color="success"
                              className=" btn-minimize"
                              size="sm"
                              type="submit"
                              onClick={() => {
                                if (!valid) {
                                  addToast("Please complete empty fields.", {
                                    appearance: "error",
                                    autoDismiss: true,
                                  });
                                }
                              }}
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
                                  collapsed
                                    ? "cil-arrow-top"
                                    : "cil-arrow-bottom"
                                }
                              />
                            </CButton>
                          </div>
                        </CCardHeader>
                        <CCollapse show={collapsed} timeout={1000}>
                          <CCardBody>
                            <CRow>
                              <CCol sm="12">
                                <Field name="jobName" validate={required}>
                                  {({ input, meta }) => (
                                    <>
                                      <CFormGroup>
                                        <CLabel htmlFor="jobName">
                                          Job Name <Required />
                                        </CLabel>
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
                                    <CLabel>
                                      Job Location <Required />
                                    </CLabel>
                                  </CCol>

                                  {jobLocations?.map((jobLocation) => (
                                    <CCol md="6" sm="6">
                                      <Field
                                        name="jobLocations"
                                        type="checkbox"
                                        value={jobLocation.id}
                                      >
                                        {({ input, meta }) => (
                                          <>
                                            <CFormGroup variant="custom-checkbox">
                                              <CInputCheckbox
                                                id={jobLocation.id}
                                                value="ss"
                                                name={input.name}
                                                checked={input.checked}
                                                onChange={input.onChange}
                                                custom
                                              />
                                              <CLabel
                                                variant="custom-checkbox"
                                                htmlFor={jobLocation.id}
                                              >
                                                {jobLocation.value}
                                              </CLabel>
                                            </CFormGroup>
                                          </>
                                        )}
                                      </Field>
                                    </CCol>
                                  ))}
                                  <CCol md="6" sm="6">
                                    <Field
                                      name="otherCheckbox"
                                      type="checkbox"
                                      value="other"
                                    >
                                      {({ input, meta }) => (
                                        <>
                                          <CFormGroup variant="custom-checkbox">
                                            <CInputCheckbox
                                              id="otherCheckbox"
                                              value="extra"
                                              name={input.name}
                                              checked={input.checked}
                                              onChange={input.onChange}
                                              custom
                                            />
                                            <CLabel
                                              variant="custom-checkbox"
                                              htmlFor="otherCheckbox"
                                            >
                                              Other
                                            </CLabel>
                                          </CFormGroup>
                                          {input.checked ? (
                                            <CCollapse
                                              show={input.checked}
                                              timeout={1000}
                                            >
                                              <Field
                                                name="otherJobLocation"
                                                //validate={required}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <CInput
                                                      id="otherJobLocation"
                                                      placeholder="Enter Job Location"
                                                      {...input}
                                                      invalid={
                                                        meta.invalid &&
                                                        meta.touched
                                                      }
                                                    />
                                                    {meta.touched &&
                                                      meta.error && (
                                                        <CInvalidFeedback className="help-block">
                                                          Please provide a valid
                                                          information
                                                        </CInvalidFeedback>
                                                      )}
                                                  </>
                                                )}
                                              </Field>
                                            </CCollapse>
                                          ) : null}
                                        </>
                                      )}
                                    </Field>
                                  </CCol>
                                  <CCol md="12">
                                    <Field name="jobLocations">
                                      {({ input, meta }) => (
                                        <>
                                          <CFormGroup row>
                                            <CCol md="12">
                                              {meta.touched && meta.error && (
                                                <CInvalidFeedback
                                                  style={{ display: "block" }}
                                                  className="help-block "
                                                >
                                                  Please provide a valid
                                                  information
                                                </CInvalidFeedback>
                                              )}
                                            </CCol>
                                          </CFormGroup>
                                        </>
                                      )}
                                    </Field>
                                  </CCol>
                                </CFormGroup>
                                <Field
                                  name="jobDescription"
                                  validate={required}
                                >
                                  {({ input, meta }) => (
                                    <>
                                      <CFormGroup row>
                                        <CCol md="12">
                                          <CLabel htmlFor="textarea-input">
                                            Type of work in progress{" "}
                                            <Required />
                                          </CLabel>
                                        </CCol>
                                        <CCol xs="12" md="12">
                                          <CTextarea
                                            {...input}
                                            invalid={
                                              meta.invalid && meta.touched
                                            }
                                            name="textarea-input"
                                            id="jobDescription"
                                            rows="3"
                                            placeholder="Enter the type of work in progress..."
                                          />
                                          {meta.touched && meta.error && (
                                            <CInvalidFeedback className="help-block">
                                              Please provide a valid information
                                            </CInvalidFeedback>
                                          )}
                                        </CCol>
                                      </CFormGroup>
                                    </>
                                  )}
                                </Field>

                                <LogCards />
                                {moment().format("dddd") == "Friday" ||
                                moment().format("dddd") == "Saturday" ||
                                moment().format("dddd") == "Sunday" ? (
                                  <Field name={"signature"}>
                                    {({ input, meta }) => (
                                      <>
                                        <CFormGroup>
                                          <CLabel>
                                            Signature <Required />
                                          </CLabel>
                                          <ESignature
                                            svg={input.value}
                                            onReady={onReadySignature}
                                            /* disableEdit={
                                          !!selectedData &&
                                          metadataRow.disableEdit
                                        } */
                                            onChange={input.onChange}
                                          ></ESignature>
                                        </CFormGroup>
                                      </>
                                    )}
                                  </Field>
                                ) : (
                                  <p></p>
                                )}
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
          </CRow>
          <RenderTimeCardsLogged />
        </>
      ) : (
        <CRow>
          <CCol lg="12">
            <CCard>
              <h4 className="text-center">Week Closed</h4>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default TimeCards;
