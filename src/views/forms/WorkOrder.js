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
import ESignature from "src/components/SiganturePadPaula";
import { Field, Form } from "react-final-form";
import { workOrderPrint } from "src/utils/workOrder";

const required = (value) => (value ? undefined : "Required");

const WorkOrder = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);

  useEffect(() => {}, []);

  const [signatureCustomer, setSignatureCustomer] = useState(null);
  const [signatureEmployee, setSignatureEmployee] = useState(null);
  const onSubmit = function (e) {
    if (!signatureCustomer.isEmpty() && !signatureEmployee.isEmpty()) {
      debugger;
      workOrderPrint({
        date: e.date,
        workType: e.workType,
        employeeName: e.employeeName,
        endTime: e.endTime,
        startTime: e.startTime,
        totalCost: e.totalCost,
        jobLocation: e.jobLocation,
        jobDetails: e.jobDetails,
        customerSignature: signatureCustomer.toDataURL(),
        employeeSignature: signatureEmployee.toDataURL(),
        customerInformation: e.clientName,
      });
    }
  };
  const validate = function (e) {
    //signaturePad.isEmpty()
  };
  const onReadyCustomerSignature = function (signaturePad) {
    setSignatureCustomer(signaturePad);
  };
  const onReadyEmployeeSignature = function (signaturePad) {
    setSignatureEmployee(signaturePad);
  };
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <CCard>
                    <CCardHeader>
                      Work Order
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
                                    <CLabel htmlFor="date">
                                      Date{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </CLabel>
                                    <CInput
                                      type="date"
                                      id="date"
                                      invalid={meta.invalid && meta.touched}
                                      {...input}
                                      placeholder="Date"
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

                            <CFormGroup>
                              <CLabel htmlFor="workType">
                                Type of work
                                <span style={{ color: "red" }}>*</span>
                              </CLabel>
                              <CCol>
                                <Field
                                  name="workType"
                                  type="radio"
                                  value="serviceCall"
                                >
                                  {({ input, meta }) => (
                                    <>
                                      <CFormGroup variant="checkbox">
                                        <CInputRadio
                                          className="form-check-input"
                                          id="radio1"
                                          value="serviceCall"
                                          name={input.name}
                                          checked={input.checked}
                                          onChange={input.onChange}
                                        />
                                        <CLabel
                                          variant="checkbox"
                                          htmlFor="radio1"
                                        >
                                          Service Call
                                        </CLabel>
                                      </CFormGroup>
                                    </>
                                  )}
                                </Field>
                                <Field
                                  name="workType"
                                  type="radio"
                                  value="extra"
                                >
                                  {({ input, meta }) => (
                                    <>
                                      <CFormGroup variant="checkbox">
                                        <CInputRadio
                                          className="form-check-input"
                                          id="radio2"
                                          value="extra"
                                          name={input.name}
                                          checked={input.checked}
                                          onChange={input.onChange}
                                        />
                                        <CLabel
                                          variant="checkbox"
                                          htmlFor="radio2"
                                        >
                                          Extra
                                        </CLabel>
                                      </CFormGroup>
                                    </>
                                  )}
                                </Field>
                                <Field
                                  name="workType"
                                  type="radio"
                                  value="other"
                                >
                                  {({ input, meta }) => (
                                    <>
                                      <CFormGroup variant="checkbox">
                                        <CInputRadio
                                          className="form-check-input"
                                          id="radio3"
                                          value="other"
                                          name={input.name}
                                          checked={input.checked}
                                          onChange={input.onChange}
                                        />
                                        <CLabel
                                          variant="checkbox"
                                          htmlFor="radio3"
                                        >
                                          Other
                                        </CLabel>
                                      </CFormGroup>
                                      {!!input.checked && (
                                        <Field name="otherWorkType">
                                          {({ input, meta }) => (
                                            <>
                                              <CFormGroup>
                                                <CInput
                                                  {...input}
                                                  invalid={
                                                    meta.invalid && meta.touched
                                                  }
                                                  id="otherWorkType"
                                                />
                                                {/* {meta.touched && meta.error && (
                                                  <CInvalidFeedback className="help-block">
                                                    Please provide a valid information
                                                  </CInvalidFeedback>
                                                )} */}
                                              </CFormGroup>
                                            </>
                                          )}
                                        </Field>
                                      )}
                                    </>
                                  )}
                                </Field>
                              </CCol>
                            </CFormGroup>

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

                            <Field name="startTime" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="startTime">
                                      Start Time
                                    </CLabel>
                                    <CInput
                                      {...input}
                                      type="time"
                                      id="startTime"
                                      invalid={meta.invalid && meta.touched}
                                      placeholder="Start Time"
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
                            <Field name="endTime" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="endTime">End Time</CLabel>
                                    <CInput
                                      {...input}
                                      type="time"
                                      id="endTime"
                                      invalid={meta.invalid && meta.touched}
                                      placeholder="End Time"
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
                            <Field name="jobLocation" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="jobLocation">
                                      Job Location
                                    </CLabel>
                                    <CInput
                                      {...input}
                                      id="jobLocation"
                                      invalid={meta.invalid && meta.touched}
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
                            <Field name="jobDetails" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="jobDetails">
                                      Job Details
                                    </CLabel>
                                    <CTextarea
                                      name="textarea-input"
                                      id="jobDetails"
                                      rows="3"
                                      placeholder="Type Here..."
                                      invalid={meta.invalid && meta.touched}
                                      {...input}
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
                            <Field name="totalCost">
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="totalCost">
                                      Total Cost
                                    </CLabel>
                                    <CInput
                                      {...input}
                                      id="totalCost"
                                      placeholder="Total Cost"
                                    />
                                  </CFormGroup>
                                </>
                              )}
                            </Field>
                            <Field name="clientName" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="clientName">
                                      Customer Full Name
                                    </CLabel>
                                    <CInput
                                      {...input}
                                      id="clientName"
                                      invalid={meta.invalid && meta.touched}
                                      placeholder="Customer Full Name"
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
                            <Field name="emailAddress" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="emailAddress">
                                      Customer Email Address
                                    </CLabel>
                                    <CInput
                                      {...input}
                                      id="emailAddress"
                                      invalid={meta.invalid && meta.touched}
                                      placeholder="Customer Email Address"
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
                            <Field name="phoneNumber" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="phoneNumber">
                                      Customer Phone Number
                                    </CLabel>
                                    <CInput
                                      {...input}
                                      id="phoneNumber"
                                      invalid={meta.invalid && meta.touched}
                                      placeholder="Customer Phone Number"
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
                            <CFormGroup>
                              <CLabel htmlFor="employeeName">
                                Customer Signature
                              </CLabel>
                              <ESignature
                                onReady={onReadyCustomerSignature}
                              ></ESignature>
                            </CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="employeeName">
                                Employee Signature
                              </CLabel>
                              <ESignature
                                onReady={onReadyEmployeeSignature}
                              ></ESignature>
                            </CFormGroup>
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
                </form>
              )}
            />
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default WorkOrder;
