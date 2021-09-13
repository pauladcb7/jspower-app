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
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInvalidFeedback,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { getBasketTotal } from "src/reducer/reducer";
import { Field, Form } from "react-final-form";

const required = (value) => (value ? undefined : "Required");

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  const total = useSelector(getBasketTotal);

  useEffect(() => {
    console.log(user);
  }, [user]);

  function signIn() {
    dispatch({
      type: "SET_USER",
      user: {
        name: "Eric",
      },
    });
  }

  function onSubmit(e) {
    dispatch({
      type: "SET_USER",
      user: {
        name: e.username,
        rol: e.username === "eric" ? "admin" : "employee",
      },
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
                              color="primary"
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
              <CCard
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
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
