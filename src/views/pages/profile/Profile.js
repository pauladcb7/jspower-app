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
  CImg,
  CFormCheck,
  CTabContent,
  CTabPane,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import ESignature from "src/components/SiganturePadPaula";
import moment from "moment";

import { useToasts } from "react-toast-notifications";
import { api } from "../../../helpers/api";
import { SAVE_WORK_ORDER, WORK_TYPES } from "../../../helpers/urls/index";
import { useSelector, useStore } from "react-redux";
import { Field, Form } from "react-final-form";
import { workOrderPrint } from "src/utils/workOrder";
import { logo } from "src/utils/logo";

const required = (value) => (value ? undefined : "Required");

const Profile = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [initialValues, setInitialValue] = useState({});
  const [active, setActive] = useState(1);
  const { addToast } = useToasts();
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    // api
    //   .get(WORK_TYPES)
    //   .then((data) => {
    //     setWorkTypes(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     addToast(
    //       "Something went wrong loading Job Locations. Refresh the page.",
    //       {
    //         appearance: "error",
    //         autoDismiss: true,
    //       }
    //     );
    //   });
    setInitialValue({
      date: moment().format("YYYY-MM-DD"),
      firstName: user.first_name,
      lastName: user.last_name,
      emailAddress: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      profileImg: user.profile_img,
    });
  }, []);

  const Required = () => {
    return <span style={{ color: "red" }}>*</span>;
  };
  const onSubmit = function (e) {
    // if (!signatureCustomer.isEmpty() && !signatureEmployee.isEmpty()) {
    //   api
    //     .post(SAVE_WORK_ORDER, {
    //       data: {
    //         work_order_id: "-1",
    //         user_id: user.email,
    //         entry_date: e.date,
    //         work_type: e.workType == "other" ? null : e.workType,
    //         start_time: e.startTime,
    //         end_time: e.endTime,
    //         job_location: e.jobLocation,
    //         job_details: e.jobDetails,
    //         total_cost: e.totalCost,
    //         other: e.otherWorkType?.length == 0 ? "" : e.otherWorkType,
    //         employee_signature: signatureEmployee.toDataURL(),
    //         customer_name: e.customerName,
    //         customer_address: e.customerAddress,
    //         customer_phone_number: e.customerPhone,
    //         customer_email: e.customerEmail,
    //         customer_signature: signatureCustomer.toDataURL(),
    //       },
    //     })
    //     .then((result) => {
    //       setWorkOrderId(result);
    //       workOrderPrint({
    //         date: e.date,
    //         workType: e.workType,
    //         employeeName: e.employeeName,
    //         endTime: e.endTime,
    //         startTime: e.startTime,
    //         totalCost: e.totalCost,
    //         jobLocation: e.jobLocation,
    //         jobDetails: e.jobDetails,
    //         customerSignature: signatureCustomer.toDataURL(),
    //         employeeSignature: signatureEmployee.toDataURL(),
    //         customerInformation: e.customerNAme,
    //       });
    //       addToast("Work Order Submitted.", {
    //         appearance: "success",
    //         autoDismiss: true,
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       addToast("Something went wrong creating Work Order. Try again.", {
    //         appearance: "error",
    //         autoDismiss: true,
    //       });
    //     });
    //   null;
    // }
  };
  const validate = function (e) {
    const errors = {};
    return errors;
    //signaturePad.isEmpty()
  };
  const onReadyCustomerSignature = function (signaturePad) {
    // setSignatureCustomer(signaturePad);
  };
  const onReadyEmployeeSignature = function (signaturePad) {
    // setSignatureEmployee(signaturePad);
  };
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    console.log("submit", form);
  };

  const PersonalInformation = () => {
    return (
      <>
        <CRow className="pt-2">
          <CCol xs="12" md="12" lg="12">
            <Form
              onSubmit={onSubmit}
              validate={validate}
              initialValues={initialValues}
              render={({ handleSubmit, valid }) => (
                <form onSubmit={handleSubmit}>
                  <CCard>
                    <CCollapse show={collapsed} timeout={1000}>
                      <CCardBody>
                        <CRow>
                          <CCol xs="12" sm="12" lg="8">
                            <div>
                              <strong>Personal Information</strong>
                              <hr
                                style={{
                                  borderColor: "red",
                                  borderTop: "2px solid red",
                                  marginTop: "8px",
                                }}
                              ></hr>
                            </div>
                            <CRow>
                              <CCol xs="12" sm="6" lg="6">
                                <Field name="firstName" validate={required}>
                                  {({ input, meta }) => (
                                    <>
                                      <CFormGroup>
                                        <CLabel htmlFor="firstName">
                                          First Name
                                          <Required />
                                        </CLabel>
                                        <CInput
                                          {...input}
                                          id="firstName"
                                          invalid={meta.invalid && meta.touched}
                                          placeholder="FirstName"
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
                              <CCol xs="12" sm="6" lg="6">
                                <Field name="lastName" validate={required}>
                                  {({ input, meta }) => (
                                    <>
                                      <CFormGroup>
                                        <CLabel htmlFor="lastName">
                                          Last Name
                                          <Required />
                                        </CLabel>
                                        <CInput
                                          {...input}
                                          id="lastName"
                                          invalid={meta.invalid && meta.touched}
                                          placeholder="Last Name"
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
                            <Field name="emailAddress">
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="emailAddress">
                                      Email Address <Required />
                                    </CLabel>
                                    <div className="controls">
                                      <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                          <CInputGroupText>@</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput
                                          readOnly
                                          {...input}
                                          id="emailAddress"
                                          placeholder="example@jspowerelectricinc.com"
                                          type="email"
                                        />
                                      </CInputGroup>
                                    </div>
                                  </CFormGroup>
                                </>
                              )}
                            </Field>
                            <Field name="phoneNumber">
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="phoneNumber">
                                      Phone Number
                                    </CLabel>
                                    <div className="controls">
                                      <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                          <CInputGroupText>
                                            <CIcon size="xs" name="cil-phone" />
                                          </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput
                                          {...input}
                                          id="phoneNumber"
                                          placeholder="(000) 000-0000"
                                          type="text"
                                        />
                                      </CInputGroup>
                                    </div>
                                  </CFormGroup>
                                </>
                              )}
                            </Field>
                            <Field name="address">
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="address">Address</CLabel>
                                    <div className="controls">
                                      <CInputGroup className="input-prepend">
                                        <CInputGroupPrepend>
                                          <CInputGroupText>
                                            <CIcon
                                              size="xs"
                                              name="cil-location-pin"
                                            />
                                          </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput
                                          {...input}
                                          id="address"
                                          placeholder="Address"
                                          type="text"
                                        />
                                      </CInputGroup>
                                    </div>
                                  </CFormGroup>
                                </>
                              )}
                            </Field>
                          </CCol>
                          <CCol xs="12" sm="12" lg="4">
                            <div>
                              <strong>Profile Image</strong>
                              <hr
                                style={{
                                  borderColor: "red",
                                  borderTop: "2px solid red",
                                  marginTop: "8px",
                                }}
                              ></hr>
                            </div>
                            <div className="text-center">
                              <CImg
                                align="center"
                                rounded
                                width={200}
                                height={200}
                                src={"avatars/profile_photo.png"}
                                // className="c-avatar-img"
                                alt={user.email}
                              />
                            </div>
                            <CCol sm="12" lg="12" className="text-center">
                              <Field name="profileImg">
                                {({ input, meta }) => (
                                  <>
                                    <CFormGroup>
                                      <CLabel htmlFor="profileImg">
                                        Change Image
                                      </CLabel>
                                      <CInputFile
                                        className="text-center"
                                        {...input}
                                        id="profileImg"
                                        placeholder="profileImg"
                                        name="file-input"
                                      />
                                    </CFormGroup>
                                  </>
                                )}
                              </Field>
                            </CCol>
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
          </CCol>
        </CRow>
      </>
    );
  };

  const MaterialRequisitions = () => {
    return (
      <>
        <CRow className="pt-2">
          <CCol xs="12" md="12" lg="12">
            <CCard>Material Req</CCard>
          </CCol>
        </CRow>
      </>
    );
  };
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12" lg="12">
          <CCard>
            <CCardBody>
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>Personal Information</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>Time Cards</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>Material Requisitions</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane>
                    <PersonalInformation />
                  </CTabPane>
                  <CTabPane>{`2. test`}</CTabPane>
                  <CTabPane>
                    <MaterialRequisitions />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Profile;
