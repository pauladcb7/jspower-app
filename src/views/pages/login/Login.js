import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CImg,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInvalidFeedback,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { getBasketTotal } from "src/reducer/reducer";
import { Field, Form } from "react-final-form";
import { api } from "src/helpers/api";

import { LOG_IN, TEST } from "../../../helpers/urls";

const required = (value) => (value ? undefined : "Required");

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  const total = useSelector(getBasketTotal);
  const { addToast } = useToasts();

  useEffect(() => {
    console.log(user);
  }, [user]);

  function signIn() {
    dispatch({
      type: "SET_USER",
      user: {
        name: "Admin",
      },
    });
  }

  function onSubmit(e) {
    api
      .post(LOG_IN, {
        user_email: e.username,
        user_passwd: e.password,
      })
      .then((token) => {
        console.log("Logged In!!");
        api
          .get(TEST, { headers: { "x-access-token": token.token } })
          .then((data) => {
            console.log("data return ", data);

            dispatch({
              type: "SET_USER",
              user: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                rol: data.role === "admin" ? "admin" : "employee",
                token: token.token,
              },
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function validate() {}

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit }) => (
                      <CForm onSubmit={handleSubmit}>
                        <CCol
                          md="12"
                          sm="12"
                          lg="12"
                          className="text-center mb-5"
                        >
                          <CImg
                            src={"avatars/jspower_logo.png"}
                            className="c-avatar-img"
                            alt="JS Power"
                          />
                        </CCol>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>

                          <Field name="username" validate={required}>
                            {({ input, meta }) => (
                              <>
                                <CInput
                                  type="text"
                                  placeholder="Username"
                                  autoComplete="username"
                                  {...input}
                                  invalid={meta.invalid && meta.touched}
                                />
                                {meta.touched && meta.error && (
                                  <CInvalidFeedback className="help-block">
                                    Please provide a valid information
                                  </CInvalidFeedback>
                                )}
                              </>
                            )}
                          </Field>
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <Field name="password" validate={required}>
                            {({ input, meta }) => (
                              <>
                                <CInput
                                  type="password"
                                  placeholder="Password"
                                  autoComplete="current-password"
                                  {...input}
                                  invalid={meta.invalid && meta.touched}
                                />
                                {meta.touched && meta.error && (
                                  <CInvalidFeedback className="help-block">
                                    Please provide a valid information
                                  </CInvalidFeedback>
                                )}
                              </>
                            )}
                          </Field>
                        </CInputGroup>
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              type="submit"
                              color="danger"
                              className="px-4"
                            >
                              Login
                            </CButton>
                          </CCol>
                          <CCol xs="6" className="text-right">
                            <CButton color="link" className="px-0">
                              Forgot password?
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    )}
                  />
                </CCardBody>
              </CCard>
              {/* <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
