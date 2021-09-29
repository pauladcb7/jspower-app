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
import moment from "moment";

import { useToasts } from "react-toast-notifications";
import { api } from "../../helpers/api";
import { SAVE_WORK_ORDER, WORK_TYPES } from "../../helpers/urls/index";
import { useSelector, useStore } from "react-redux";
import { Field, Form } from "react-final-form";
import { workOrderPrint } from "src/utils/workOrder";

const required = (value) => (value ? undefined : "Required");

const WorkOrder = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [initialValues, setInitialValue] = useState({});
  const [workTypes, setWorkTypes] = useState([
    {
      id: 1,
      value: "Extra",
      code: "EXTRA",
    },
    {
      id: 2,
      value: "Service Call",
      code: "SERVICE_CALL",
    },
    {
      id: 4,
      value: "Work Order",
      code: "WORK_ORDER",
    },
  ]);
  const [otherWorkType, setOtherWorkType] = useState(false);
  const { addToast } = useToasts();
  const user = useSelector((state) => {
    return state.user;
  });
  const [workOrderId, setWorkOrderId] = useState(null);

  useEffect(() => {
    api
      .get(WORK_TYPES)
      .then((data) => {
        setWorkTypes(data);
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
    setInitialValue({
      date: moment().format("YYYY-MM-DD"),
    });
  }, []);

  const [signatureCustomer, setSignatureCustomer] = useState(null);
  const [signatureEmployee, setSignatureEmployee] = useState(null);

  const Required = () => {
    return <span style={{ color: "red" }}>*</span>;
  };
  const onSubmit = function (e) {
    if (!signatureCustomer.isEmpty() && !signatureEmployee.isEmpty()) {
      api
        .post(SAVE_WORK_ORDER, {
          data: {
            work_order_id: "-1",
            user_id: user.email,
            entry_date: e.date,
            work_type: "10", //e.workType,
            start_time: e.startTime,
            end_time: e.endTime,
            job_location: e.jobLocation,
            job_details: e.jobDetails,
            total_cost: e.totalCost,
            other: e.otherWorkType?.length == 0 ? "" : e.otherWorkType,
            employee_signature: signatureEmployee.toDataURL(),
            customer_name: e.customerName,
            customer_address: e.customerAddress,
            customer_phone_number: e.customerPhone,
            customer_email: e.customerEmail,
            customer_signature: signatureCustomer.toDataURL(),
          },
        })
        .then((result) => {
          setWorkOrderId(result);
          addToast("Work Order Submitted.", {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch((error) => {
          console.log(error);
          addToast("Something went wrong creating Work Order. Try again.", {
            appearance: "error",
            autoDismiss: true,
          });
        });
      // workOrderPrint({
      //   date: e.date,
      //   workType: e.workType,
      //   employeeName: e.employeeName,
      //   endTime: e.endTime,
      //   startTime: e.startTime,
      //   totalCost: e.totalCost,
      //   jobLocation: e.jobLocation,
      //   jobDetails: e.jobDetails,
      //   customerSignature: signatureCustomer.toDataURL(),
      //   employeeSignature: signatureEmployee.toDataURL(),
      //   customerInformation: e.customerNAme,
      // });
    }
  };
  const validate = function (e) {
    const errors = {};
    return errors;
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
              initialValues={initialValues}
              render={({ handleSubmit, valid }) => (
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
                                      Date <Required />
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
                                <Required />
                              </CLabel>
                              {workTypes?.map((wt) => (
                                <CCol md="6" sm="6">
                                  <Field
                                    name="workType"
                                    type="radio"
                                    value={String(wt.id)}
                                  >
                                    {({ input, meta }) => (
                                      <>
                                        <CFormGroup variant="checkbox">
                                          <CInputRadio
                                            {...input}
                                            className="form-check-input"
                                            id={wt.id + "test"}
                                            name={input.name}
                                            checked={input.checked}
                                            onChange={input.onChange}
                                            value={wt.id}
                                          />
                                          <CLabel
                                            variant="checkbox"
                                            htmlFor={wt.id + "test"}
                                          >
                                            {wt.value}
                                          </CLabel>
                                        </CFormGroup>
                                      </>
                                    )}
                                  </Field>
                                </CCol>
                              ))}
                              <CCol>
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
                                          id="workType"
                                          value="other"
                                          name={input.name}
                                          checked={input.checked}
                                          onChange={input.onChange}
                                        />
                                        <CLabel
                                          variant="checkbox"
                                          htmlFor="otherWorkType"
                                        >
                                          Other
                                        </CLabel>
                                      </CFormGroup>
                                      {!!input.checked && (
                                        <Field
                                          name="otherWorkType"
                                          validate={required}
                                        >
                                          {({ input, meta: metaOther }) => (
                                            <>
                                              <CFormGroup>
                                                <CInput
                                                  {...input}
                                                  invalid={
                                                    metaOther.invalid &&
                                                    metaOther.touched
                                                  }
                                                  id="otherWorkType"
                                                  placeholder="Enter Other Type of Work"
                                                />
                                                {metaOther.touched &&
                                                  metaOther.error && (
                                                    <CInvalidFeedback className="help-block">
                                                      Please provide a valid
                                                      information
                                                    </CInvalidFeedback>
                                                  )}
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

                            {/* <Field name="employeeName" validate={required}>
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
                            </Field> */}

                            <Field name="startTime" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="startTime">
                                      Start Time
                                      <Required />
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
                                    <CLabel htmlFor="endTime">
                                      End Time
                                      <Required />
                                    </CLabel>
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
                                      <Required />
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
                                      <Required />
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
                                      Labor & Material Total
                                    </CLabel>
                                    <div className="controls">
                                      <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                          <CInputGroupText>$</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput
                                          {...input}
                                          id="totalCost"
                                          placeholder="00.00"
                                          type="number"
                                          min="0.00"
                                          step="0.01"
                                        />
                                      </CInputGroup>
                                    </div>
                                  </CFormGroup>
                                </>
                              )}
                            </Field>
                            <br></br>
                            <div>
                              <strong>Customer Information</strong>
                              <hr
                                style={{
                                  borderColor: "red",
                                  borderTop: "2px solid red",
                                  marginTop: "8px",
                                }}
                              ></hr>
                            </div>
                            <Field name="customerName" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="customerName">
                                      Customer Full Name
                                      <Required />
                                    </CLabel>
                                    <CInput
                                      {...input}
                                      id="customerName"
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
                            <Field name="customerAddress" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="customerAddress">
                                      Customer Address
                                      <Required />
                                    </CLabel>
                                    <CInput
                                      {...input}
                                      id="customerAddress"
                                      invalid={meta.invalid && meta.touched}
                                      placeholder="Customer Address"
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
                            <Field name="customerEmail" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="customerEmail">
                                      Customer Email Address
                                      <Required />
                                    </CLabel>
                                    <CInput
                                      {...input}
                                      id="customerEmail"
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
                            <Field name="customerPhone" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="customerPhone">
                                      Customer Phone Number
                                      <Required />
                                    </CLabel>
                                    <CInput
                                      {...input}
                                      id="customerPhone"
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
                              <CLabel htmlFor="customerSignature">
                                Customer Signature
                                <Required />
                              </CLabel>
                              <ESignature
                                onReady={onReadyCustomerSignature}
                              ></ESignature>
                            </CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="employeeSignature">
                                Employee Signature
                                <Required />
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
