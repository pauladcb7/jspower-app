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
  CModal,
  CButtonGroup,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { getBase64ImageFromURL } from "src/utils";
import { DocsLink } from "src/reusable";
import ESignature from "src/components/SiganturePadPaula";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { circuitPrint } from "src/utils/circuitPrint";
import CrudTable from "src/containers/CrudTable";
import { timecardPrint } from "src/utils/timecardPrint";
import moment from "moment";
import {
  DELETE_TIME_CARD,
  DELETE_TIME_ENTRY,
  GET_TIME_CARD,
  GET_TIME_SHEETS_BY_DAY,
  JOB_LOCATIONS,
  USERS_GET,
} from "src/helpers/urls";
import { api } from "src/helpers/api";
import { array } from "prop-types";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useToasts } from "react-toast-notifications";
import { base64Blank } from "../../assets/blankBase64";

const required = (value) => (value ? undefined : "Required");

const fieldsTable = ["ckt", "load", "ckt1", "load1"];
const initialArray = [];
for (let index = 1; index < 43; index++) {
  const element = { ckt: index, load: "", ckt1: index + 1, load1: "" };
  initialArray.push(element);
  index++;
}
initialArray.push();

function TimeEntry({ push, locations }) {
  return (
    <div>
      <Field name="lunch_in">
        {({ input, meta }) => (
          <>
            <CFormGroup>
              <CLabel>Lunch In</CLabel>
              <CInput
                {...input}
                type="time"
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
      <Field name="lunch_out">
        {({ input, meta }) => (
          <>
            <CFormGroup>
              <CLabel>Lunch Out</CLabel>
              <CInput
                {...input}
                type="time"
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
      <FieldArray name={"timecards"}>
        {({ fields: items }) => (
          <div>
            <CDataTable
              items={items.value}
              fields={[
                {
                  key: "jobName",
                  label: "Job Name",
                  sorter: false,
                  filter: false,
                  _style: { minWidth: "150px" },
                },
                {
                  key: "jobDescription",
                  label: "Job Description",
                  sorter: false,
                  filter: false,
                  _style: { minWidth: "150px" },
                },
                {
                  key: "clockIn",
                  label: "Clock In",
                  sorter: false,
                  filter: false,
                },
                {
                  key: "clockInGps",
                  label: "Clock In GPS",
                  sorter: false,
                  filter: false,
                  _style: { minWidth: "150px" },
                },
                {
                  key: "clockOut",
                  label: "Clock Out",
                  sorter: false,
                  filter: false,
                },
                {
                  key: "clockOutGps",
                  label: "Clock Out GPS",
                  sorter: false,
                  filter: false,
                  _style: { minWidth: "150px" },
                },
                {
                  key: "jobLocations",
                  label: "Job Locations",
                  sorter: false,
                  filter: false,
                  _style: { minWidth: "300px" },
                },
              ]}
              striped
              scopedSlots={{
                jobName: (item, index) => {
                  return (
                    <td>
                      <Field
                        name={`timecards.${index}.jobName`}
                        validate={required}
                      >
                        {({ input, meta }) => (
                          <>
                            <CFormGroup>
                              <CInput
                                {...input}
                                type="text"
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
                    </td>
                  );
                },
                jobDescription: (item, index) => {
                  return (
                    <td>
                      <Field
                        name={`timecards.${index}.jobDescription`}
                        validate={required}
                      >
                        {({ input, meta }) => (
                          <>
                            <CFormGroup>
                              <CInput
                                {...input}
                                type="text"
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
                    </td>
                  );
                },
                clockIn: (item, index) => {
                  return (
                    <td>
                      <Field name={`timecards.${index}.clockIn`}>
                        {({ input, meta }) => (
                          <>
                            <CFormGroup>
                              <CInput
                                {...input}
                                type="time"
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
                    </td>
                  );
                },
                clockInGps: (item, index) => {
                  return (
                    <td>
                      <Field name={`timecards.${index}.clockInGps`}>
                        {({ input, meta }) => (
                          <>
                            <CFormGroup>
                              <CInput
                                {...input}
                                type="text"
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
                    </td>
                  );
                },
                clockOut: (item, index) => {
                  return (
                    <td>
                      <Field name={`timecards.${index}.clockOut`}>
                        {({ input, meta }) => (
                          <>
                            <CFormGroup>
                              <CInput
                                {...input}
                                type="time"
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
                    </td>
                  );
                },
                clockOutGps: (item, index) => {
                  return (
                    <td>
                      <Field name={`timecards.${index}.clockOutGps`}>
                        {({ input, meta }) => (
                          <>
                            <CFormGroup>
                              <CInput
                                {...input}
                                type="text"
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
                    </td>
                  );
                },
                jobLocations: (item, index) => {
                  return (
                    <td>
                      <Field
                        name={`timecards.${index}.jobLocations`}
                        validate={required}
                      >
                        {({ input, meta }) => (
                          <CreatableSelect
                            isMulti
                            getOptionLabel={(option) => {
                              return option.value;
                            }}
                            menuPortalTarget={document.body}
                            onChange={input.onChange}
                            value={input.value}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                            /* onChange={(handleChange) => {

                        }} */
                            options={locations}
                          />
                        )}
                      </Field>
                    </td>
                  );
                },
              }}
            />
            <CButton
              block
              color="dark"
              type="button"
              onClick={() => {
                push("timecards", {});
              }}
            >
              <CIcon size="lg" name="cil-plus" /> Add Timecard
            </CButton>
          </div>
        )}
      </FieldArray>
      {/*  job_name: timecard.jobName,
        job_description: timecard.jobDescription,
        other: timecard.other,
        clock_in: timecard.clock_in,
        clock_out: timecard.clock_out,
        clock_in_gps: timecard.clock_in_gps,
        clock_out_gps: timecard.clock_out_gps,
        //all_week_ind: timecard.allWeekInd,
        time_entry_id: new_time_entry_id.id,
        status: timecard.clock_out
          ? "CLOCK_OUT"
          : timecard.clock_in
          ? "CLOCK_IN"
          : "NEW",
        created_at: new Date().toISOString(), */}
    </div>
  );
}
const TimeCardCrud = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [checkedJobLocations, setCheckedJobLocations] = React.useState({});
  useEffect(() => {}, []);
  const nullValue = "-";

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
    if (e.isTimeEntry) {
      //
    } else {
      //
    }
  };
  const validate = function () {};

  //const [rows, setRow] = useState(rowsInitial);
  const [details, setDetails] = useState([]);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };
  const [detailsSecondLevel, setDetailsSecondLevel] = useState({});

  const toggleDetailsSecond = (index, subIndex) => {
    const newDetailsSecondLevel = { ...detailsSecondLevel };

    if (!newDetailsSecondLevel[index]) {
      newDetailsSecondLevel[index] = [];
    }

    const position = newDetailsSecondLevel[index].indexOf(subIndex);
    let newDetails = newDetailsSecondLevel[index].slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...newDetailsSecondLevel[index], subIndex];
    }
    newDetailsSecondLevel[index] = newDetails;
    setDetailsSecondLevel(newDetailsSecondLevel);
  };

  function deleteTimeEntry(timeEntry) {
    return api
      .delete(DELETE_TIME_ENTRY, {
        data: {
          id: timeEntry.id,
        },
      })
      .then(() => {
        addToast("Time Entry Removed.", {
          appearance: "success",
          autoDismiss: true,
        });
        fetchTable();
      })
      .catch((err) => {
        console.log(err);
        addToast("Something went wrong. Try again.", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  }

  function deleteTimeCard(timeCard) {
    return api
      .delete(DELETE_TIME_CARD, {
        data: {
          id: timeCard.id,
        },
      })
      .then(() => {
        addToast("Time Card Removed.", {
          appearance: "success",
          autoDismiss: true,
        });
        fetchTable();
      })
      .catch((err) => {
        console.log(err);
        addToast("Something went wrong. Try again.", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  }

  const metadata = [
    // date range
    // user
    // Number timecards
    {
      key: "details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
      hide: true,
      custom: (item, indexLevel1) => {
        const itemWeek = item;
        return (
          <CCollapse show={details.includes(indexLevel1)}>
            <CCardBody>
              <CDataTable
                striped
                hover
                items={item.timeEntry}
                fields={[
                  {
                    key: "show-modal",
                    label: "",
                    _style: { maxWidth: "10px" },
                    sorter: false,
                    filter: false,
                  },
                  {
                    key: "entryDate",
                    label: "Date",
                    sorter: false,
                    filter: false,
                  },
                  {
                    key: "lunchIn",
                    label: "Lunch In",
                    sorter: false,
                    filter: false,
                  },
                  {
                    key: "lunchOut",
                    label: "Lunch Out",
                    sorter: false,
                    filter: false,
                  },
                ]}
                itemsPerPage={15}
                pagination
                scopedSlots={{
                  details: (item, index) => {
                    return (
                      <CCollapse
                        show={detailsSecondLevel[indexLevel1]?.includes(index)}
                      >
                        <CCardBody>
                          <CDataTable
                            striped
                            hover
                            items={item.timecard}
                            fields={[
                              {
                                key: "show-modal",
                                label: "",
                                sorter: false,
                                filter: false,
                              },
                              {
                                key: "jobName",
                                label: "Job Name",
                                sorter: false,
                                filter: false,
                              },
                              {
                                key: "clockIn",
                                label: "Clock In",
                                sorter: false,
                                filter: false,
                              },
                              {
                                key: "clockInGps",
                                label: "Clock In GPS",
                                sorter: false,
                                filter: false,
                              },
                              {
                                key: "clockOut",
                                label: "Clock Out",
                                sorter: false,
                                filter: false,
                              },
                              {
                                key: "clockOutGps",
                                label: "Clock Out GPS",
                                sorter: false,
                                filter: false,
                              },
                            ]}
                            itemsPerPage={15}
                            pagination
                            scopedSlots={{
                              "show-modal": (itemsecondLevel, index2) => {
                                return (
                                  <td
                                    className="py-2"
                                    style={{
                                      minWidth: 85,
                                      width: 85,
                                    }}
                                  >
                                    <CButtonGroup size="sm">
                                      <CButton
                                        color="danger"
                                        size="sm"
                                        onClick={async () => {
                                          await deleteTimeCard(itemsecondLevel);
                                          fetchTable();
                                        }}
                                      >
                                        <CIcon width={24} name="cil-trash" />
                                      </CButton>
                                    </CButtonGroup>
                                  </td>
                                );
                              },

                              clockIn: (itemsecondLevel, index2) => {
                                return (
                                  <td
                                    className="py-2"
                                    style={{
                                      minWidth: 85,
                                      width: 85,
                                    }}
                                  >
                                    {moment(
                                      itemsecondLevel.clockIn,
                                      "HH:mm"
                                    ).isValid()
                                      ? moment(
                                          itemsecondLevel.clockIn,
                                          "HH:mm"
                                        ).format("hh:mm A")
                                      : nullValue}
                                  </td>
                                );
                              },
                              clockOut: (itemsecondLevel, index2) => {
                                return (
                                  <td
                                    className="py-2"
                                    style={{
                                      minWidth: 85,
                                      width: 85,
                                    }}
                                  >
                                    {moment(
                                      itemsecondLevel.clockOut,
                                      "HH:mm"
                                    ).isValid()
                                      ? moment(
                                          itemsecondLevel.clockOut,
                                          "HH:mm"
                                        ).format("hh:mm A")
                                      : nullValue}
                                  </td>
                                );
                              },
                            }}
                          />
                        </CCardBody>
                      </CCollapse>
                    );
                  },
                  "show-modal": (item, index) => {
                    return (
                      <td
                        className="py-2"
                        style={{
                          minWidth: 132,
                          width: 132,
                        }}
                      >
                        <CButtonGroup size="sm">
                          <CButton
                            color="info"
                            size="sm"
                            onClick={() => {
                              setInitialData({
                                ...item,
                                date: moment(item.entryDate).format(
                                  "YYYY-MM-DD"
                                ),
                                id: item.id,
                                user: users.find((user) => {
                                  return user.return === itemWeek.employee?.id;
                                }),
                                lunch_in: item.lunchIn,
                                lunch_out: item.lunchOut,
                                timecards: item.timecard.map((tc) => {
                                  return {
                                    jobName: tc.jobName,
                                    jobDescription: tc.jobDescription,
                                    clockIn: tc.clockIn,
                                    clockInGps: tc.clockInGps,
                                    clockOut: tc.clockOut,
                                    clockOutGps: tc.clockOutGps,
                                    jobLocations: tc.otherLocation
                                      ? [
                                          {
                                            label: tc.otherLocation,
                                            value: tc.otherLocation,
                                            __isNew__: true,
                                          },
                                          ...locations.filter((value) => {
                                            return tc.location.find((lc) => {
                                              return value.id == lc.id;
                                            });
                                          }),
                                        ]
                                      : [
                                          ...locations.filter((value) => {
                                            return tc.location.find((lc) => {
                                              return value.id == lc.id;
                                            });
                                          }),
                                        ],
                                  };
                                }),
                                /* user: values.user,
                                date: values.date,
                                lunch_in: re.timeEntryLunchIn,
                                lunch_out: re.timeEntryLunchOut,
                                timecards: re.timecard.map(
                                  (tc) => {
                                    return {
                                      jobName: tc.jobName,
                                      jobDescription:
                                        tc.jobDescription,
                                      clockIn: tc.clockIn,
                                      clockInGps: tc.clockInGps,
                                      clockOut: tc.clockOut,
                                      clockOutGps: tc.clockOutGps,
                                      jobLocations:
                                        tc.otherLocation
                                          ? [
                                              {
                                                label:
                                                  tc.otherLocation,
                                                value:
                                                  tc.otherLocation,
                                                __isNew__: true,
                                              },
                                              ...locations.filter(
                                                (value) => {
                                                  return tc.location.find(
                                                    (lc) => {
                                                      return (
                                                        value.id ==
                                                        lc.id
                                                      );
                                                    }
                                                  );
                                                }
                                              ),
                                            ]
                                          : [
                                              ...locations.filter(
                                                (value) => {
                                                  return tc.location.find(
                                                    (lc) => {
                                                      return (
                                                        value.id ==
                                                        lc.id
                                                      );
                                                    }
                                                  );
                                                }
                                              ),
                                            ],
                                    };
                                  }
                                ), */
                                /* entryDate: moment(item.entryDate).format(
                                  "YYYY-MM-DD"
                                ),
                                isTimeEntry: true, */
                              });
                              setModal(true);
                              /* setMetadataCustom([
                                {
                                  key: "entryDate",
                                  label: "Date",
                                  type: "date",
                                  sorter: false,
                                  filter: false,
                                  _style: { minWidth: "120px" },
                                },
                                {
                                  key: "lunchIn",
                                  label: "Lunch In",
                                  type: "time",
                                  sorter: false,
                                  filter: false,
                                },
                                {
                                  key: "lunchOut",
                                  label: "Lunch Out",
                                  type: "time",
                                  sorter: false,
                                  filter: false,
                                  _style: { minWidth: "190px" },
                                },
                              ]);
                              setSelectedData({
                                ...item,
                                entryDate: moment(item.entryDate).format(
                                  "YYYY-MM-DD"
                                ),
                                isTimeEntry: true,
                              });
                              setModal(true); */
                            }}
                          >
                            <CIcon width={24} name="cil-pencil" />
                          </CButton>
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={async () => {
                              await deleteTimeEntry(item);
                              fetchTable();
                              /* await onDelete(item);
                              onRefreshTable() */
                            }}
                          >
                            <CIcon width={24} name="cil-trash" />
                          </CButton>
                          <CButton
                            color="dark"
                            size="sm"
                            onClick={() => {
                              toggleDetailsSecond(String(indexLevel1), index);
                            }}
                          >
                            {detailsSecondLevel[String(indexLevel1)]?.includes(
                              index
                            )
                              ? "Hide"
                              : "Show"}
                          </CButton>
                        </CButtonGroup>
                      </td>
                    );
                  },
                  lunchIn: (itemsecondLevel, index2) => {
                    return (
                      <td className="py-2">
                        {moment(itemsecondLevel.lunchIn, "HH:mm").isValid()
                          ? moment(itemsecondLevel.lunchIn, "HH:mm").format(
                              "hh:mm A"
                            )
                          : nullValue}
                      </td>
                    );
                  },
                  lunchOut: (itemsecondLevel, index2) => {
                    return (
                      <td className="py-2">
                        {moment(itemsecondLevel.lunchOut, "HH:mm").isValid()
                          ? moment(itemsecondLevel.lunchOut, "HH:mm").format(
                              "hh:mm A"
                            )
                          : nullValue}
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCollapse>
        );
      },
    },
    {
      key: "dateRange",
      label: "Date Range",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "employeeName",
      label: "Employee",
      type: "text",
      sorter: false,
      filter: false,
    },
    {
      key: "timecards",
      label: "# Timecards",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "190px" },
    },
  ];
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metadataCustom, setMetadataCustom] = useState([]);

  function parseData(array) {
    return array.map((ar) => {
      let [first_name, last_name = ""] = ar.employee.email
        .split("@")[0]
        .split(".");
      first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1);
      last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1);

      const fullName =
        ar.employee.firstName && ar.employee.lastName
          ? ar.employee.firstName || "" + " " + ar.employee.lastName || ""
          : first_name + " " + last_name;
      const esign = ar.timeEntry?.find((te) => {
        if (te.esignature?.length > 0) return te.esignature;
      });
      return {
        ...ar,
        dateRange: ar.week,
        employeeName: fullName,
        timecards: ar.timeEntry.length,
        esignature: esign?.esignature || base64Blank,
      };
    });
    /* {
      "weekly_time_entries": [
        {
          "time_entry_id": 3,
          "week_range": "From 2021-10-04 to 2021-10-10",
          "entry_date": "2021-10-05T05:00:00.000Z",
          "user_id": "paula.delcarpio@jspowerelectricinc.com"
        }
      ],
      "daily_time_entries": [
        {
          "time_entry_id": 3,
          "user_id": "paula.delcarpio@jspowerelectricinc.com",
          "lunch_in": null,
          "lunch_out": null,
          "entry_date": "2021-10-05T05:00:00.000Z"
        }
      ],
      "daily_time_cards": [
        {
          "time_card_id": 1,
          "user_id": "paula.delcarpio@jspowerelectricinc.com",
          "job_name": "affa",
          "job_description": "affa",
          "clock_in": null,
          "clock_out": null,
          "clock_in_location": null,
          "clock_out_location": null,
          "entry_date": "2021-10-05T05:00:00.000Z"
        }
      ]
    } */
  }
  function fetchTable() {
    setLoading(true);
    try {
      return api.get(GET_TIME_CARD).then((timecards) => {
        //timecards.map(parseData)
        timecards?.forEach((week) => {
          week.timeEntry?.forEach((te) => {
            te.entryDate = moment(te.entryDate).format("YYYY-MM-DD");

            // te.lunchIn = te.lunchIn
            //   ? moment(te.lunchIn, ["HH:mm"]).format("h:mm A")
            //   : nullValue;
            // te.lunchOut = te.lunchOut
            //   ? moment(te.lunchOut, ["HH:mm"]).format("h:mm A")
            //   : nullValue;

            te.timecard?.forEach((tc) => {
              // tc.clockIn = tc.clockIn
              //   ? moment(tc.clockIn, ["HH:mm"]).format("h:mm A")
              //   : nullValue;
              // tc.clockOut = tc.clockOut
              //   ? moment(tc.clockOut, ["HH:mm"]).format("h:mm A")
              //   : nullValue;
              tc.clockOutGps = tc.clockOutGps ? tc.clockOutGps : nullValue;
              tc.clockInGps = tc.clockInGps ? tc.clockInGps : nullValue;
            });
          });
        });
        setRows(parseData(timecards || []));
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      addToast("Something went wrong loading Time Entires. Try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }

  const [modal, setModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [locations, setJobLocations] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [users, setUsers] = useState([]);
  const { addToast } = useToasts();
  let blank = "";
  useEffect(async () => {
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

    api
      .get(USERS_GET)
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
        addToast("Something went wrong loading Users. Refresh the page.", {
          appearance: "error",
          autoDismiss: true,
        });
      });
    //const blankImg = import("../../assets/blank.png").default;

    blank = base64Blank;

    fetchTable();
  }, []);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const onCreateTimeEntry = (e) => {
    let promise;

    if (e.id) {
      promise = api
        .post("time-card/update", {
          timeEntry: {
            id: e.id,
            userId: e.user.return,
            entry_date: e.date,
            lunch_in: e.lunch_in,
            lunch_out: e.lunch_out,
            timecards: e.timecards.map((tc) => {
              const jls = tc.jobLocations.filter((jlT) => {
                return jlT.id && !jlT.__isNew__;
              });
              const other = tc.jobLocations.find((jlT) => {
                return jlT.__isNew__;
              });
              return {
                jobName: tc.jobName,
                job_locations: jls.map((jlsT) => {
                  return jlsT.id;
                }),
                jobDescription: tc.jobDescription,
                clock_in: tc.clockIn,
                clock_out: tc.clockOut,
                clock_in_gps: tc.clockInGps,
                clock_out_gps: tc.clockOutGps,
                other: other ? other.value : "",
              };
            }),
          },
        })
        .then(() => {
          fetchTable();
        });
    } else {
      promise = api
        .post("time-card/create", {
          timeEntry: {
            id: e.id,
            userId: e.user.return,
            entry_date: e.date,
            lunch_in: e.lunch_in,
            lunch_out: e.lunch_out,
            timecards: e.timecards?.map((tc) => {
              const jls = tc.jobLocations.filter((jlT) => {
                return jlT.id && !jlT.__isNew__;
              });
              const other = tc.jobLocations.find((jlT) => {
                return jlT.__isNew__;
              });
              return {
                jobName: tc.jobName,
                job_locations: jls.map((jlsT) => {
                  return jlsT.id;
                }),
                jobDescription: tc.jobDescription,
                clock_in: tc.clockIn,
                clock_out: tc.clockOut,
                clock_in_gps: tc.clockInGps,
                clock_out_gps: tc.clockOutGps,
                other: other ? other.value : "",
              };
            }),
          },
        })
        .then(() => {
          fetchTable();
        });
    }
    promise.then(() => {
      addToast("Time Entry Submitted.", {
        appearance: "success",
        autoDismiss: true,
      });
      api
        .get(GET_TIME_SHEETS_BY_DAY, {
          params: {
            user_id: e.user.return,
            entry_date: e.date,
          },
        })
        .then(([re]) => {
          if (re) {
            setInitialData({
              user: e.user,
              date: e.date,
              id: re.timeEntryId,
              lunch_in: re.timeEntryLunchIn,
              lunch_out: re.timeEntryLunchOut,
              timecards: re.timecard.map((tc) => {
                return {
                  jobName: tc.jobName,
                  jobDescription: tc.jobDescription,
                  clockIn: tc.clockIn,
                  clockInGps: tc.clockInGps,
                  clockOut: tc.clockOut,
                  clockOutGps: tc.clockOutGps,
                  jobLocations: tc.otherLocation
                    ? [
                        {
                          label: tc.otherLocation,
                          value: tc.otherLocation,
                          __isNew__: true,
                        },
                        ...locations.filter((value) => {
                          return tc.location.find((lc) => {
                            return value.id == lc.id;
                          });
                        }),
                      ]
                    : [
                        ...locations.filter((value) => {
                          return tc.location.find((lc) => {
                            return value.id == lc.id;
                          });
                        }),
                      ],
                };
              }),
            });
          } else {
            setInitialData({
              user: e.user,
              date: e.date,
            });
          }
        });
    });
  };

  const AddForm = ({ closeModal }) => {
    return (
      <Form
        onSubmit={onCreateTimeEntry}
        initialValues={initialData || {}}
        mutators={{
          ...arrayMutators,
        }}
        validate={validate}
        render={({
          handleSubmit,
          form: {
            mutators: { push, pop },
          },
          values,
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              <CModalBody>
                <Field name="date">
                  {({ input, meta }) => (
                    <>
                      <CFormGroup>
                        <CLabel>Pick Date</CLabel>
                        <CInput
                          {...input}
                          type="date"
                          disabled={!!values.id}
                          invalid={meta.invalid && meta.touched}
                        />
                      </CFormGroup>
                    </>
                  )}
                </Field>
                <Field name="user">
                  {({ input, meta }) => (
                    <>
                      <CFormGroup>
                        <CLabel>Select User</CLabel>
                        <Select
                          options={users}
                          isDisabled={!!values.id}
                          onChange={input.onChange}
                          getOptionLabel={(option) => {
                            return option.display;
                          }}
                          value={input.value}
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
                {!values.id && (
                  <CButton
                    color="primary"
                    onClick={() => {
                      if (values.date && values.user) {
                        api
                          .get(GET_TIME_SHEETS_BY_DAY, {
                            params: {
                              user_id: values.user.return,
                              entry_date: values.date,
                            },
                          })
                          .then(([re]) => {
                            if (re) {
                              setInitialData({
                                user: values.user,
                                date: values.date,
                                id: re.timeEntryId,
                                lunch_in: re.timeEntryLunchIn,
                                lunch_out: re.timeEntryLunchOut,
                                timecards: re.timecard.map((tc) => {
                                  return {
                                    jobName: tc.jobName,
                                    jobDescription: tc.jobDescription,
                                    clockIn: tc.clockIn,
                                    clockInGps: tc.clockInGps,
                                    clockOut: tc.clockOut,
                                    clockOutGps: tc.clockOutGps,
                                    jobLocations: tc.otherLocation
                                      ? [
                                          {
                                            label: tc.otherLocation,
                                            value: tc.otherLocation,
                                            __isNew__: true,
                                          },
                                          ...locations.filter((value) => {
                                            return tc.location.find((lc) => {
                                              return value.id == lc.id;
                                            });
                                          }),
                                        ]
                                      : [
                                          ...locations.filter((value) => {
                                            return tc.location.find((lc) => {
                                              return value.id == lc.id;
                                            });
                                          }),
                                        ],
                                  };
                                }),
                              });
                            } else {
                              setInitialData({
                                user: values.user,
                                date: values.date,
                              });
                            }
                          });
                      }
                    }}
                  >
                    Search
                  </CButton>
                )}
                {((!!values.date && !!values.user) || !!values.id) && (
                  <TimeEntry locations={locations} push={push} />
                )}
                {/* {metadata.map(function (metadataRow) {
            return (
              <Field name={metadataRow.key} key={metadataRow.key}>
                {({ input, meta }) => (
                  <>
                    <CFormGroup>
                      <CLabel htmlFor={metadataRow.key}
                        style={{
                          fontWeight:  metadataRow.type === 'separator' ? 'bolder': 'normal',
                          width:  metadataRow.type === 'separator' ? '100%': 'auto'
                        }}
                      >
                        {metadataRow.label}
                        {
                          metadataRow.type === 'separator' &&
                          <hr
                            style={{
                              borderColor: "red",
                              borderTop: "2px solid red",
                              marginTop: "8px",
                              marginBottom: '1px'
                            }}
                          ></hr>
                        }
                      </CLabel>
                      {metadataRow.type === "signature" ? (
                        <ESignature
                          svg={input.value}
                          disableEdit={!!selectedData && metadataRow.disableEdit}
                          onChange={input.onChange}
                        ></ESignature>
                      ) : null}
                      {metadataRow.type === "text" ? (
                        <CInput
                          {...input}
                          id={metadataRow.key}
                          invalid={meta.invalid && meta.touched}
                        />
                      ) : null}
                      {metadataRow.type === "date" ? (
                        <CInput
                          {...input}
                          type="date"
                          id={metadataRow.key}
                          invalid={meta.invalid && meta.touched}
                        />
                      ) : null}
                      {metadataRow.type === "datetime" ? (
                        <CInput
                          {...input}
                          type="datetime-local"
                          id={metadataRow.key}
                          invalid={meta.invalid && meta.touched}
                        />
                      ) : null}

                      {metadataRow.type === "time" ? (
                        <CInput
                          {...input}
                          type="time"
                          id={metadataRow.key}
                          invalid={meta.invalid && meta.touched}
                        />
                      ) : null}
                      {metadataRow.type === "textarea" ? (
                        <CTextarea
                          {...input}
                          type="time"
                          id={metadataRow.key}
                          rows="9"
                          invalid={meta.invalid && meta.touched}
                        />
                      ) : null}

                      {meta.touched && meta.error && (
                        <CInvalidFeedback className="help-block">
                          Please provide a valid information
                        </CInvalidFeedback>
                      )}
                    </CFormGroup>
                  </>
                )}
              </Field>
            );
          })} */}
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" type="submit">
                  {!values.id ? "Create" : "Update"}
                </CButton>{" "}
                {!!values.id && (
                  <>
                    <CButton
                      color="danger"
                      onClick={() => {
                        //onDelete(selectedData);
                        setModal(false);
                      }}
                    >
                      Delete
                    </CButton>{" "}
                  </>
                )}
                <CButton
                  color="secondary"
                  onClick={() => {
                    setModal(false);
                    setSelectedData(null);
                    if (closeModal) {
                      closeModal();
                    }
                  }}
                >
                  Cancel
                </CButton>
              </CModalFooter>
            </form>
          </>
        )}
      />
    );
  };

  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                Time Cards
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
                  <CrudTable
                    title="Time Card"
                    rows={rows}
                    onAddRow={() => {
                      setInitialData({});
                    }}
                    customAddForm={({ closeModal }) => {
                      return <AddForm closeModal={closeModal} />;
                    }}
                    onRefreshTable={fetchTable}
                    onDelete={(row) => {
                      //deleteTimeEntry
                    }}
                    metadata={metadata}
                    loading={loading}
                    disableEdit
                    addOption={(row, index) => {
                      return (
                        <>
                          <CButton
                            color="secondary"
                            size="sm"
                            onClick={() => {
                              debugger;
                              timecardPrint({
                                employeeName: row.employeeName,
                                jobName: row.jobName,
                                jobDescription: row.jobDescription,
                                jobLocations: row.jobLocation,
                                employeeSignature: row.esignature,
                                timeEntries: row.timeEntry,
                              });
                            }}
                          >
                            <CIcon width={24} name="cil-print" />
                          </CButton>
                          <CButton
                            color="dark"
                            size="sm"
                            onClick={() => {
                              toggleDetails(index);
                            }}
                          >
                            {details.includes(index) ? "Hide" : "Show"}
                          </CButton>
                        </>
                      );
                    }}
                  ></CrudTable>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
      <CModal
        show={modal}
        onClose={() => {
          setModal(false);
          setSelectedData(null);
          //setLarge(!large)
        }}
        closeOnBackdrop={false}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>{"Time Entry"}</CModalTitle>
        </CModalHeader>
        <AddForm />
      </CModal>
    </>
  );
};
/*  <CFade timeout={300} in={showElements} unmountOnExit={true}>
   <CrudTable
     rows={rows}
     metadata={metadata}
   ></CrudTable>
 </CFade>
</CCol>
</CRow> */

export default TimeCardCrud;
