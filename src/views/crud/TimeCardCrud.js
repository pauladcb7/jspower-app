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
import { DocsLink } from "src/reusable";
import ESignature from "src/components/SiganturePadPaula";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { circuitPrint } from "src/utils/circuitPrint";
import CrudTable from "src/containers/CrudTable";
import { timecardPrint } from "src/utils/timecardPrint";
import moment from "moment";
import { DELETE_TIME_CARD, DELETE_TIME_ENTRY, GET_TIME_CARD } from "src/helpers/urls";
import { api } from "src/helpers/api";
import { array } from "prop-types";

const required = (value) => (value ? undefined : "Required");

const fieldsTable = ["ckt", "load", "ckt1", "load1"];
const initialArray = [];
for (let index = 1; index < 43; index++) {
  const element = { ckt: index, load: "", ckt1: index + 1, load1: "" };
  initialArray.push(element);
  index++;
}
initialArray.push();

const TimeCardCrud = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
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
  const onSubmit = function (e) {
    if(e.isTimeEntry) {
      // 
    } else {
      //
    }
  };
  const validate = function () { };

  //const [rows, setRow] = useState(rowsInitial);
  const [details, setDetails] = useState([])

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
  const [detailsSecondLevel, setDetailsSecondLevel] = useState({})

  const toggleDetailsSecond = (index,subIndex) => {
    const newDetailsSecondLevel = {...detailsSecondLevel};

    if(!newDetailsSecondLevel[index]) {
      newDetailsSecondLevel[index] = [];
    }
    
    const position = newDetailsSecondLevel[index].indexOf(subIndex)
    let newDetails = newDetailsSecondLevel[index].slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...newDetailsSecondLevel[index], subIndex]
    }
    newDetailsSecondLevel[index] = newDetails
    setDetailsSecondLevel(newDetailsSecondLevel)
  }

  function deleteTimeEntry(timeEntry) {
    return api
    .delete(DELETE_TIME_ENTRY, {
      data: {
        id:timeEntry.id
      }
    })
  }
  
  function deleteTimeCard(timeCard) {
    return api
    .delete(DELETE_TIME_CARD, {
      data: {
        id:timeCard.id
      }
    })
  }

  const metadata = [
    // date range
    // user
    // Number timecards 
    {
      key: 'details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false,
      hide: true,
      custom: (item, indexLevel1) => {
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
                  }
                ]}
                itemsPerPage={15}
                pagination
                scopedSlots={{
                  "details": (item, index) => {
                    return <CCollapse show={detailsSecondLevel[indexLevel1]?.includes(index)}>
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
                            }
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
                                    width:85
                                  }}
                                >
                                  <CButtonGroup size="sm">
                                    <CButton
                                      color="info"
                                      size="sm"
                                      onClick={() => {
                                        setMetadataCustom([
                                          {
                                            key: 'jobName',
                                            label: 'Job Name',
                                            type: 'text',
                                            sorter: false,
                                            filter: false,
                                            _style: { minWidth: '120px' },
                                          },
                                          {
                                            key: 'jobDescription',
                                            label: 'Job Description',
                                            type: 'text',
                                            sorter: false,
                                            filter: false,
                                          },
                                          {
                                            key: 'clockIn',
                                            label: 'Clock In',
                                            type: 'time',
                                            sorter: false,
                                            filter: false,
                                            _style: { minWidth: '190px' },
                                          },
                                          {
                                            key: 'clockInGps',
                                            label: 'Clock In GPS',
                                            type: 'text',
                                            sorter: false,
                                            filter: false,
                                            _style: { minWidth: '190px' },
                                          },
                                          {
                                            key: 'clockOut',
                                            label: 'Clock Out',
                                            type: 'time',
                                            sorter: false,
                                            filter: false,
                                            _style: { minWidth: '190px' },
                                          },
                                          {
                                            key: 'clockOutGps',
                                            label: 'Clock Out GPS',
                                            type: 'text',
                                            sorter: false,
                                            filter: false,
                                            _style: { minWidth: '190px' },
                                          },
                                        ])
                                        setSelectedData({...itemsecondLevel, entryDate: moment(item.entryDate).format('YYYY-MM-DD'), isTimeEntry: false});
                                        setModal(true);
                                      }}
                                    >
                                      <CIcon width={24} name="cil-pencil" />
                                    </CButton>
                                    <CButton
                                      color="danger"
                                      size="sm"
                                      onClick={async () => {
                                        await deleteTimeCard(itemsecondLevel);
                                        fetchTable()
                                      }}
                                    >
                                      <CIcon width={24} name="cil-trash" />
                                    </CButton>
                                  </CButtonGroup>
                                </td>
                              );
                            },
                          }}
                        />
                      </CCardBody>
                    </CCollapse>
                  },
                  "show-modal": (item, index) => {
                    return (
                      <td
                        className="py-2"
                        style={{
                          minWidth: 132,
                          width:132
                        }}
                      >
                        <CButtonGroup size="sm">
                          <CButton
                            color="info"
                            size="sm"
                            onClick={() => {
                              setMetadataCustom([
                                {
                                  key: 'entryDate',
                                  label: 'Date',
                                  type: 'date',
                                  sorter: false,
                                  filter: false,
                                  _style: { minWidth: '120px' },

                                },
                                {
                                  key: 'lunchIn',
                                  label: 'Lunch In',
                                  type: 'time',
                                  sorter: false,
                                  filter: false,
                                },
                                {
                                  key: 'lunchOut',
                                  label: 'Lunch Out',
                                  type: 'time',
                                  sorter: false,
                                  filter: false,
                                  _style: { minWidth: '190px' },
                                }
                              ])
                              setSelectedData({...item, entryDate: moment(item.entryDate).format('YYYY-MM-DD'),isTimeEntry: true});
                              setModal(true);
                            }}
                          >
                            <CIcon width={24} name="cil-pencil" />
                          </CButton>
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={async () => {
                              await deleteTimeEntry(item)
                              fetchTable()
                              /* await onDelete(item);
                              onRefreshTable() */
                            }}
                          >
                            <CIcon width={24} name="cil-trash" />
                          </CButton>
                          <CButton
                            color="dark"
                            size="sm"
                            onClick={() => { toggleDetailsSecond(String(indexLevel1),index) }}
                          >
                            {detailsSecondLevel[String(indexLevel1)]?.includes(index) ? 'Hide' : 'Show'}
                          </CButton>
                        </CButtonGroup>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCollapse>
        )
      }
    },
    {
      key: 'dateRange',
      label: 'Date Range',
      type: 'text',
      sorter: false,
      filter: false,
      _style: { minWidth: '120px' },

    },
    {
      key: 'employeeName',
      label: 'Employee',
      type: 'text',
      sorter: false,
      filter: false,
    },
    {
      key: 'timecards',
      label: '# Timecards',
      type: 'text',
      sorter: false,
      filter: false,
      _style: { minWidth: '190px' },
    },
  ]
  const [rows,setRows] = useState([]);
  const [loading,setLoading] = useState(false);
  const [metadataCustom,setMetadataCustom] = useState([]);
  
  function parseData (array) {
    return array.map((ar) => {
      return {
        ...ar,
        dateRange: ar.week,
        employeeName: ar.employee.email,
        timecards: ar.timeEntry.length
      }
    })
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
    debugger
  }
  function fetchTable () {
    setLoading(true);
    return api
    .get(GET_TIME_CARD).then((timecards) => {
      //timecards.map(parseData)
      setRows(parseData(timecards));
      setLoading(false)
    })
  }

  const [modal,setModal] = useState(false)
  const [selectedData , setSelectedData] = useState(null)
  useEffect(() => {
      fetchTable()
      
  }, []);
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
                    onRefreshTable={fetchTable}
                    onDelete={row => {
                      //debugger
                      //deleteTimeEntry
                    }}
                    metadata={metadata}
                    loading={loading}
                    disableEdit
                    addOption={(row, index) => {
                      return <>
                        <CButton
                          color="secondary"
                          size="sm"
                          onClick={() => {
                            debugger
                            timecardPrint({
                              //rows: 
                              employeeName: row.employeeName,
                              jobName: row.jobName,
                              jobLocations: row.jobLocation,
                              employeeSignature: row.signature,
                              timeEntries: row.timeEntry
                            })
                            //toggleDetails(index)
                          }}
                        >
                          <CIcon width={24} name="cil-print" />
                        </CButton>
                        <CButton
                          color="dark"
                          size="sm"
                          onClick={() => { toggleDetails(index) }}
                        >
                          {details.includes(index) ? 'Hide' : 'Show'}
                        </CButton>
                      </>
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
          <CModalTitle>{"title"}</CModalTitle>
        </CModalHeader>
        <Form
          onSubmit={onSubmit}
          initialValues={selectedData || {}}
          mutators={{
            ...arrayMutators,
          }}
          validate={validate}
          render={({
            handleSubmit,
            form: {
              mutators: { push, pop },
            },
          }) => (
            <>
              <form onSubmit={handleSubmit}>
                <CModalBody>
                  {metadataCustom.map(function (metadataRow) {
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

                              {metadataRow.type === "currency" ? (
                                <div className="controls">
                                  <CInputGroup className="input-prepend">
                                    <CInputGroupPrepend>
                                      <CInputGroupText>$</CInputGroupText>
                                    </CInputGroupPrepend>
                                    <CInput
                                      {...input}
                                      placeholder="00.00"
                                      type="number"
                                      min="0.00"
                                      step="0.01"
                                    />
                                  </CInputGroup>
                                </div>
                              ) : null}
                              
                              {metadataRow.type === "array" ? (
                                <>
                                  <FieldArray name={metadataRow.key}>
                                    {({ fields: items }) => (
                                      <div>
                                        <CDataTable
                                          items={items.value}
                                          fields={[
                                            ...metadataRow.shape.filter(
                                              function (m) {
                                                return !m.hide;
                                              }
                                            ),
                                          ]}
                                          striped
                                          scopedSlots={metadataRow.shape.reduce(
                                            function (prev, curr) {
                                              prev[curr.key] = (
                                                item,
                                                index
                                              ) => {
                                                return (
                                                  <Field
                                                    name={`${metadataRow.key}.${index}.${curr.key}`}
                                                  >
                                                    {({
                                                      input: inputArray,
                                                      meta,
                                                    }) => (
                                                      <>
                                                        <td
                                                          className="py-2"
                                                          style={{
                                                            minWidth: 120,
                                                          }}
                                                        >
                                                          <CFormGroup>
                                                            {curr.type ===
                                                              "idNumeric" &&
                                                              index + 1}
                                                            {curr.type ===
                                                            "text" ? (
                                                              <CInput
                                                                {...inputArray}
                                                                id={
                                                                  metadataRow.key
                                                                }
                                                                invalid={
                                                                  meta.invalid &&
                                                                  meta.touched
                                                                }
                                                              />
                                                            ) : null}
                                                          </CFormGroup>
                                                        </td>
                                                      </>
                                                    )}
                                                  </Field>
                                                );
                                              };
                                              return prev;
                                            },
                                            {}
                                          )}
                                        />
                                        <CButton
                                          block
                                          color="dark"
                                          type="button"
                                          onClick={() => {
                                            push(metadataRow.key, {});
                                          }}
                                        >
                                          <CIcon size="lg" name="cil-plus" />{" "}
                                          Add Row
                                        </CButton>
                                      </div>
                                    )}
                                  </FieldArray>
                                </>
                              ) : null}
                              {metadataRow.type === "radius" ? (
                                <>
                                  {metadataRow.options?.map(function (option) {
                                    return (
                                      <Field
                                        name={metadataRow.key}
                                        type="radio"
                                        value={option.value}
                                      >
                                        {({
                                          input: inputOption,
                                          meta,
                                          values,
                                        }) => (
                                          <>
                                            <CFormGroup variant="checkbox">
                                              <CInputRadio
                                                className="form-check-input"
                                                id={option.value}
                                                value={option.value}
                                                name={inputOption.name}
                                                checked={
                                                  inputOption.checked ||
                                                  (option.otherOption &&
                                                    !metadataRow.options.find(
                                                      (option) => {
                                                        return (
                                                          option.value ===
                                                          input.value
                                                        );
                                                      }
                                                    ))
                                                }
                                                onChange={inputOption.onChange}
                                              />
                                              <CLabel
                                                variant="checkbox"
                                                htmlFor={option.value}
                                              >
                                                {option.label}
                                              </CLabel>
                                              {option.otherOption &&
                                                !metadataRow.options.find(
                                                  (option) => {
                                                    return (
                                                      option.value ===
                                                        input.value &&
                                                      !option.otherOption
                                                    );
                                                  }
                                                ) && (
                                                  <div>
                                                    <Field
                                                      name={metadataRow.otherKey}
                                                    >
                                                      {({
                                                        input,
                                                        meta,
                                                        values,
                                                      }) => (
                                                        <>
                                                          <CInput
                                                            {...input}
                                                            invalid={
                                                              meta.invalid &&
                                                              meta.touched
                                                            }
                                                          />
                                                        </>
                                                      )}
                                                    </Field>
                                                  </div>
                                                )}
                                            </CFormGroup>
                                          </>
                                        )}
                                      </Field>
                                    );
                                  })}
                                </>
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
                  })}
                </CModalBody>
                <CModalFooter>
                  <CButton color="primary" type="submit">
                    {selectedData === null ? "Create" : "Update"}
                  </CButton>{" "}
                  {!!selectedData && (
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
                    }}
                  >
                    Cancel
                  </CButton>
                </CModalFooter>
              </form>
            </>
          )}
        />
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
