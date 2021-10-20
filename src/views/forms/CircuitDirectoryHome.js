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
import { useToasts } from "react-toast-notifications";
import { circuitHPrint, circuitPrint } from "src/utils/circuitPrint";
import { api } from "../../helpers/api";
import { SAVE_CIRCUIT_DIRECTORY } from "../../helpers/urls/index";

const required = (value) => (value ? undefined : "Required");

const fieldsTable = ["ckt", "load"];
const initialArray = [];
for (let index = 0; index < 20; index++) {
  const element = { ckt: index + 1, load: "", ckt1: index + 1, load1: "" };
  initialArray.push(element);
}
initialArray.push();

const CircuitDirectoryHome = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [checkedJobLocations, setCheckedJobLocations] = React.useState({});
  const [rows, setRow] = useState(initialArray);
  const [circuitDirectoryId, setCircuitDirectoryId] = useState("-1");
  const circuitDirectoryType = "HOME";
  const { addToast } = useToasts();
  useEffect(() => {}, [checkedJobLocations]);

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
  const onSubmit = async function (e) {
    try {
      const circuitDirectoryID = await api.post(SAVE_CIRCUIT_DIRECTORY, {
        circuit_directory_id: "-1",
        entry_date: e.date,
        circuit_type_rc: circuitDirectoryType,
        voltage: e.voltage,
        circuit_directory_details: e.circuitDirectoryDetails,
      });
      setCircuitDirectoryId(circuitDirectoryID.id);

      addToast("Circuit Directory Submitted.", {
        appearance: "success",
        autoDismiss: true,
      });
      circuitHPrint({
        date: e.date,
        voltage: e.voltage,
        rows: e.circuitDirectoryDetails,
      });
    } catch (error) {
      console.log(error);
      addToast("Something went wrong creating Circuit Directory. Try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  const validate = function () {};
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              initialValues={{
                circuitDirectoryDetails: Array.from({ length: 20 }, (_, i) => {
                  return { ckt: i + 1, load: "" };
                }),
              }}
              mutators={{
                ...arrayMutators,
              }}
              render={({
                handleSubmit,
                form: {
                  mutators: { push, pop },
                },
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <CCard>
                    <CCardHeader>
                      Circuit Directory - 240 Volt
                      <div className="card-header-actions">
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
                            <Field name="date" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="date">Date</CLabel>
                                    <CInput
                                      {...input}
                                      type="date"
                                      id="date"
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
                            <Field name="voltage" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="voltage">Voltage</CLabel>
                                    <CInput
                                      {...input}
                                      invalid={meta.invalid && meta.touched}
                                      id="voltage"
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
                            {/* <CDataTable
                              items={rows}
                              fields={fieldsTable}
                              responsive
                              striped
                              addTableClasses="black-red-striped"
                              itemsPerPage={50}
                              scopedSlots={{
                                ckt: (item, index) => {
                                  return <td className="py-2">{item.ckt}</td>;
                                },
                                load: (item, index) => {
                                  return (
                                    <td
                                      className="py-2"
                                      style={{ minWidth: 120 }}
                                    >
                                      <CInput
                                        type="text"
                                        placeholder="Load"
                                        onChange={(e) => {
                                          const rowsT = [...rows];
                                          rowsT[index]["load"] = e.target.value;
                                          setRow(rowsT);
                                        }}
                                      />
                                    </td>
                                  );
                                },
                              }} 
                            />*/}

                            <FieldArray name="circuitDirectoryDetails">
                              {({ fields: items }) => (
                                <>
                                  <CDataTable
                                    items={items.value}
                                    fields={fieldsTable}
                                    responsive
                                    striped
                                    addTableClasses="black-red-striped"
                                    itemsPerPage={50}
                                    scopedSlots={{
                                      ckt: (item, index) => {
                                        return (
                                          <td className="py-2">{index + 1}</td>
                                        );
                                      },
                                      load: (item, index) => {
                                        return (
                                          <td
                                            className="py-2"
                                            // style={{ width: "100%" }}
                                          >
                                            <Field
                                              name={`circuitDirectoryDetails.${index}.load`}
                                            >
                                              {({
                                                input: inputArray,
                                                meta,
                                              }) => (
                                                <>
                                                  <CInput
                                                    {...inputArray}
                                                    invalid={
                                                      meta.invalid &&
                                                      meta.touched
                                                    }
                                                    type="text"
                                                    placeholder="Load"
                                                    // onChange={(e) => {
                                                    //   const rowsT = [...rows];
                                                    //   rowsT[index]["load"] =
                                                    //     e.target.value;
                                                    //   setRow(rowsT);
                                                    // }}
                                                  />
                                                </>
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
                                      push("circuitDirectoryDetails", {
                                        ckt:
                                          values.circuitDirectoryDetails
                                            .length + 1,
                                        load: "",
                                      });
                                    }}
                                  >
                                    <CIcon size="lg" name="cil-plus" /> Add Row
                                  </CButton>
                                </>
                              )}
                            </FieldArray>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCollapse>
                    <CCardFooter>
                      <CButton block color="danger" type="submit" size="lg">
                        <CIcon size="lg" name="cil-save" /> Save
                      </CButton>
                    </CCardFooter>
                  </CCard>
                  {/* <h2>Simple Default Input</h2>
                <div>
                  <label>First Name</label>
                  <Field name="firstName" component="input" placeholder="First Name" />
                </div> */}

                  {/*  <h2>An Arbitrary Reusable Input Component</h2>
                <div>
                  <label>Interests</label>
                  <Field name="interests" component={InterestPicker} />
                </div>

                <h2>Render Function</h2>
                <Field
                  name="bio"
                  render={({ input, meta }) => (
                    <div>
                      <label>Bio</label>
                      <textarea {...input} />
                      {meta.touched && meta.error && <span>{meta.error}</span>}
                    </div>
                  )}
                />

                <h2>Render Function as Children</h2>
                <Field name="phone">
                  {({ input, meta }) => (
                    <div>
                      <label>Phone</label>
                      <input type="text" {...input} placeholder="Phone" />
                      {meta.touched && meta.error && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field> */}
                  {/* 
                <button type="submit">Submit</button> */}
                </form>
              )}
            />
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default CircuitDirectoryHome;
