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
import { USER_UPDATE, TEST } from "../../../helpers/urls/index";
import { useSelector, useStore, useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import { workOrderPrint } from "src/utils/workOrder";
import { logo } from "src/utils/logo";
const required = (value) => (value ? undefined : "Required");

const Profile = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [initialValues, setInitialValue] = useState({});
  const [active, setActive] = useState(1);
  const { addToast } = useToasts();
  const user = useSelector((state) => {
    return state.user;
  });

  const refreshUserData = () => {
    api.get(TEST).then((data) => {
      dispatch({
        type: "SET_USER",
        user: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone_number: data.phone_number,
          address: data.address,
          profile_img: data.profile_img,
          rol: data.role || "employee",
          token: user.token,
        },
      });
    });
  };
  useEffect(() => {
    refreshUserData();
  }, []);
  useEffect(() => {
    setInitialValue({
      firstName: user.first_name,
      lastName: user.last_name,
      emailAddress: user.email,
      phoneNumber: user.phone_number,
      address: user.address,
      profileImg: user.profile_img,
    });
  }, [user]);

  const Required = () => {
    return <span style={{ color: "red" }}>*</span>;
  };
  const onSubmit = function (e) {
    // if (!signatureCustomer.isEmpty() && !signatureEmployee.isEmpty()) {

    api
      .post(USER_UPDATE, {
        data: {
          first_name: e.firstName,
          last_name: e.lastName,
          phone_number: e.phoneNumber,
          address: e.address,
          profile_img: e.profileImg,
        },
      })
      .then((result) => {
        refreshUserData();
        addToast("Information Updated.", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((error) => {
        console.log(error);
        addToast("Something went wrong updating Your Information. Try again.", {
          appearance: "error",
          autoDismiss: true,
        });
      });

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

  const PersonalInformation = () => {
    return (
      <>
        <CRow className="pt-2">
          <CCol xs="12" md="12" lg="12">
            <Form
              onSubmit={onSubmit}
              validate={validate}
              initialValues={initialValues}
              render={({ handleSubmit, values, valid }) => (
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
                                          placeholder="First Name"
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
                                fluid
                                className="rounded-circle img-fluid"
                                width={200}
                                height={200}
                                src={
                                  values.profileImg ||
                                  "avatars/profile_photo.png"
                                }
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
                                        // {...input}
                                        onChange={(e) => {
                                          const reader = new FileReader();
                                          reader.readAsDataURL(
                                            e.target.files[0]
                                          );
                                          reader.onload = () => {
                                            input.onChange(reader.result);
                                            //resolve(reader.result);
                                          };
                                          reader.onerror = (error) => {
                                            //reject(error);
                                          };
                                        }}
                                        className="text-center"
                                        id="profileImg"
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
                  {/* <CNavItem>
                    <CNavLink>Time Cards</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>Material Requisitions</CNavLink>
                  </CNavItem> */}
                </CNav>
                <CTabContent>
                  <CTabPane>
                    <PersonalInformation />
                  </CTabPane>
                  {/* <CTabPane>{`2. test`}</CTabPane>
                  <CTabPane>
                    <MaterialRequisitions />
                  </CTabPane> */}
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
