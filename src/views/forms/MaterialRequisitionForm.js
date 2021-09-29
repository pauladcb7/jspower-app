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
import { useToasts } from "react-toast-notifications";
import { api } from "../../helpers/api";
import { SAVE_WORK_ORDER, WORK_TYPES } from "../../helpers/urls/index";
import { useSelector, useStore } from "react-redux";

import arrayMutators from "final-form-arrays";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { materialRequisitionPrint } from "src/utils/materialRequisitionPrint";
import moment from "moment";

const fields = ["id", "qty", "size", "part#", "item"];
const required = (value) => (value ? undefined : "Required");

const MaterialRequisitionForm = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [details, setDetails] = useState([]);
  const [rows, setRow] = useState([{}, {}, {}, {}]);
  const { addToast } = useToasts();
  const [initialValues, setInitialValue] = useState({});
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const fullName =
      user.first_name && user.last_name
        ? user.first_name + " " + user.last_name
        : user.email
            .split("@")
            .shift()
            .split(".")
            .map((i) => {
              return i.charAt(0).toUpperCase() + i.slice(1) + " ";
            })
            .toString()
            .replace(",", "")
            .trim();
    setInitialValue({
      requestedBy: fullName,
      todayDate: moment().format("YYYY-MM-DD"),
    });
  }, []);

  const Required = () => {
    return <span style={{ color: "red" }}>*</span>;
  };

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

  const onSubmit = (e) => {
    console.log(JSON.stringify(e.materialRequisitionDetails));
    // materialRequisitionPrint({
    //   jobLocation: e.jobLocation,
    //   jobName: e.jobName,
    //   needBy: e.needBy,
    //   requestedBy: e.requestedBy,
    //   rows: e.materialRequisitionDetails,
    //   todayDate: e.todayDate,
    // });
  };
  const validate = () => {};
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <Form
                onSubmit={onSubmit}
                validate={validate}
                initialValues={initialValues}
                mutators={{
                  ...arrayMutators,
                }}
                render={({
                  handleSubmit,
                  valid,
                  form: {
                    mutators: { push, pop },
                  },
                }) => (
                  <form onSubmit={handleSubmit}>
                    <CCardHeader>
                      Material Requisition Form
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
                            <CRow>
                              <CCol sm="6">
                                <Field name="jobName" validate={required}>
                                  {({ input, meta }) => (
                                    <>
                                      <CFormGroup>
                                        <CLabel htmlFor="jobName">
                                          Job Name
                                          <Required />
                                        </CLabel>
                                        <CInput
                                          type="text"
                                          id="jobName"
                                          invalid={meta.invalid && meta.touched}
                                          {...input}
                                          placeholder="Job Name"
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
                              </CCol>
                              <CCol sm="6">
                                <Field name="jobLocation" validate={required}>
                                  {({ input, meta }) => (
                                    <>
                                      <CFormGroup>
                                        <CLabel htmlFor="jobLocation">
                                          Job Location
                                          <Required />
                                        </CLabel>
                                        <CInput
                                          type="text"
                                          id="jobLocation"
                                          invalid={meta.invalid && meta.touched}
                                          {...input}
                                          placeholder="Job Location"
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
                              </CCol>
                              <CCol sm="6">
                                <Field name="requestedBy" validate={required}>
                                  {({ input, meta }) => (
                                    <>
                                      <CFormGroup>
                                        <CLabel htmlFor="requestedBy">
                                          Requested by
                                          <Required />
                                        </CLabel>
                                        <CInput
                                          type="text"
                                          id="requestedBy"
                                          invalid={meta.invalid && meta.touched}
                                          {...input}
                                          placeholder="Requested By"
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
                              </CCol>
                              <CCol sm="6">
                                <Field name="todayDate" validate={required}>
                                  {({ input, meta }) => (
                                    <>
                                      <CFormGroup>
                                        <CLabel htmlFor="todayDate">
                                          Today's Date
                                          <Required />
                                        </CLabel>
                                        <CInput
                                          type="date"
                                          id="todayDate"
                                          invalid={meta.invalid && meta.touched}
                                          {...input}
                                          placeholder="Today's Date"
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
                              </CCol>
                            </CRow>
                            <Field name="needBy" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="needBy">
                                      Need by
                                      <Required />
                                    </CLabel>
                                    <CInput
                                      type="date"
                                      id="needBy"
                                      invalid={meta.invalid && meta.touched}
                                      {...input}
                                      placeholder="Need by"
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

                            <Field name="jobDescription" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup row>
                                    <CCol md="12">
                                      <CLabel htmlFor="textarea-input">
                                        Description (Labor and Task)
                                      </CLabel>
                                    </CCol>
                                    <CCol xs="12" md="12">
                                      <CTextarea
                                        {...input}
                                        name="textarea-input"
                                        id="jobDescription"
                                        rows="3"
                                        placeholder="Enter the type of work in progress..."
                                      />
                                    </CCol>
                                  </CFormGroup>
                                </>
                              )}
                            </Field>

                            <CCard>
                              <CCardHeader>Items</CCardHeader>
                              <CCardBody>
                                <FieldArray name="materialRequisitionDetails">
                                  {({ fields: items }) => (
                                    <>
                                      <CDataTable
                                        items={items.value}
                                        fields={[
                                          {
                                            key: "id",
                                            type: "idNumeric",
                                          },
                                          {
                                            key: "quantity",
                                            type: "text",
                                            _style: { minWidth: "160px" },
                                          },
                                          {
                                            key: "size",
                                            type: "text",
                                            _style: { minWidth: "160px" },
                                          },
                                          {
                                            key: "partNumber",
                                            type: "text",
                                            _style: { minWidth: "160px" },
                                          },
                                          {
                                            key: "itemDescription",
                                            type: "text",
                                            _style: { minWidth: "160px" },
                                          },
                                        ]}
                                        striped
                                        scopedSlots={{
                                          id: (item, index) => {
                                            return (
                                              <td className="py-2">
                                                {index + 1}
                                              </td>
                                            );
                                          },
                                          quantity: (item, index) => {
                                            return (
                                              <td
                                                className="py-2"
                                                style={{ minWidth: 120 }}
                                              >
                                                <Field
                                                  name={`materialRequisitionDetails.${index}.quantity`}
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
                                                          <CInput
                                                            {...inputArray}
                                                            //id={metadataRow.key}
                                                            invalid={
                                                              meta.invalid &&
                                                              meta.touched
                                                            }
                                                          />
                                                        </CFormGroup>
                                                      </td>
                                                    </>
                                                  )}
                                                </Field>
                                              </td>
                                            );
                                          },
                                          size: (item, index) => {
                                            return (
                                              <td
                                                className="py-2"
                                                style={{ minWidth: 120 }}
                                              >
                                                <Field
                                                  name={`materialRequisitionDetails.${index}.size`}
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
                                                          <CInput
                                                            {...inputArray}
                                                            //id={metadataRow.key}
                                                            invalid={
                                                              meta.invalid &&
                                                              meta.touched
                                                            }
                                                          />
                                                        </CFormGroup>
                                                      </td>
                                                    </>
                                                  )}
                                                </Field>
                                              </td>
                                            );
                                          },
                                          partNumber: (item, index) => {
                                            return (
                                              <td
                                                className="py-2"
                                                style={{ minWidth: 120 }}
                                              >
                                                <Field
                                                  name={`materialRequisitionDetails.${index}.partNumber`}
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
                                                          <CInput
                                                            {...inputArray}
                                                            //id={metadataRow.key}
                                                            invalid={
                                                              meta.invalid &&
                                                              meta.touched
                                                            }
                                                          />
                                                        </CFormGroup>
                                                      </td>
                                                    </>
                                                  )}
                                                </Field>
                                              </td>
                                            );
                                          },
                                          itemDescription: (item, index) => {
                                            return (
                                              <td
                                                className="py-2"
                                                style={{ minWidth: 120 }}
                                              >
                                                <Field
                                                  name={`materialRequisitionDetails.${index}.itemDescription`}
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
                                                          <CInput
                                                            {...inputArray}
                                                            //id={metadataRow.key}
                                                            invalid={
                                                              meta.invalid &&
                                                              meta.touched
                                                            }
                                                          />
                                                        </CFormGroup>
                                                      </td>
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
                                          push(
                                            "materialRequisitionDetails",
                                            {}
                                          );
                                        }}
                                      >
                                        <CIcon size="lg" name="cil-plus" /> Add
                                        Row
                                      </CButton>
                                    </>
                                  )}
                                </FieldArray>
                              </CCardBody>
                            </CCard>

                            {/* <CCard>
                              <CCardHeader>Items</CCardHeader>
                              <CCardBody>
                                <CDataTable
                                  items={rows}
                                  fields={fields}
                                  striped
                                  itemsPerPage={50}
                                  pagination
                                  scopedSlots={}
                                />
                                <CButton
                                  block
                                  color="dark"
                                  type="button"
                                  onClick={() => {
                                    const rowsT = [...rows];
                                    rowsT.push({});
                                    setRow(rowsT);
                                  }}
                                >
                                  <CIcon size="lg" name="cil-plus" /> Add Row
                                </CButton>
                              </CCardBody>
                            </CCard> */}
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCollapse>
                    <CCardFooter>
                      <CButton
                        block
                        color="danger"
                        type="submit"
                        size="lg"
                        onClick={() => {
                          if (!valid) {
                            addToast("Please complete empty fields.", {
                              appearance: "error",
                              autoDismiss: true,
                            });
                          }
                        }}
                      >
                        <CIcon size="lg" name="cil-clock" /> Save
                      </CButton>
                    </CCardFooter>
                  </form>
                )}
              />
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default MaterialRequisitionForm;
