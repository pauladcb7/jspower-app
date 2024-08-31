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
import {
  SAVE_RECEIPT,
  GET_JOB,
  GET_WORK_ORDER,
} from "../../helpers/urls/index";
import { useSelector, useStore } from "react-redux";
import { Field, Form } from "react-final-form";
import Select from "react-select";

const required = (value) => (value ? undefined : "Required");

const Receipt = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [initialValues, setInitialValue] = useState({});
  const [jobs, setJobs] = useState({});
  const [workOrders, setWorkOrders] = useState({});

  const { addToast } = useToasts();
  const user = useSelector((state) => {
    return state.user;
  });
  const [workOrderId, setWorkOrderId] = useState(null);

  useEffect(() => {
    api
      .get(GET_WORK_ORDER)
      .then((data) => {
        data = data.map((workOrder) => {
          return {
            display: workOrder.job_details,
            value: workOrder.id,
          };
        });
        setWorkOrders(data);
      })
      .catch((error) => {
        console.log(error);
        addToast(
          "Something went wrong loading WorkOrders list. Refresh the page.",
          {
            appearance: "error",
            autoDismiss: true,
          }
        );
      });
    api
      .get(GET_JOB)
      .then((data) => {
        data = data.map((job) => {
          return {
            display: job.job_name,
            value: job.id,
          };
        });
        setJobs(data);
      })
      .catch((error) => {
        console.log(error);
        addToast("Something went wrong loading Jobs list. Refresh the page.", {
          appearance: "error",
          autoDismiss: true,
        });
      });
    setInitialValue({
      date: moment().format("YYYY-MM-DD"),
      comments: "",
    });
  }, []);

  const getBase64 = (file, b) => {
    return new Promise((resolve, reject) => {
      debugger;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      console.log(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    });
  };

  const Required = () => {
    return <span style={{ color: "red" }}>*</span>;
  };
  const onSubmit = async function (e) {
    debugger;
    let file = document.getElementById("receiptFile").files[0];
    const fileBase64 = await getBase64(file);

    api
      .post(SAVE_RECEIPT, {
        data: {
          receipt_id: "-1",
          user_id: user.email,
          job_id: e.job.value,
          work_order_id: e.workOrder.value,
          receipt_file: fileBase64,
          comments: e.comments,
        },
      })
      .then((result) => {
        setWorkOrderId(result);
        addToast("Receipt Uploaded Successfully.", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((error) => {
        console.log(error);
        addToast("Something went wrong uploading Receipt. Try again.", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  const validate = function (e) {
    const errors = {};
    return errors;
    //signaturePad.isEmpty()
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
                      Receipt
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
                            <Field name="job" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="job">
                                      Job <Required />
                                    </CLabel>
                                    <Select
                                      options={jobs}
                                      invalid={meta.invalid && meta.touched}
                                      placeholder="Select a Job"
                                      onChange={input.onChange}
                                      getOptionLabel={(option) => {
                                        return option.display;
                                      }}
                                      value={input.value}
                                    />
                                    {meta.touched && meta.error && (
                                      <CInvalidFeedback className="help-block">
                                        Please provide valid information.
                                      </CInvalidFeedback>
                                    )}
                                  </CFormGroup>
                                </>
                              )}
                            </Field>
                            <Field name="workOrder" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="workOrder">
                                      Work Order <Required />
                                    </CLabel>
                                    <Select
                                      options={workOrders}
                                      invalid={meta.invalid && meta.touched}
                                      placeholder="Select a Work Order"
                                      onChange={input.onChange}
                                      getOptionLabel={(option) => {
                                        return option.display;
                                      }}
                                      value={input.value}
                                    />
                                    {meta.touched && meta.error && (
                                      <CInvalidFeedback className="help-block">
                                        Please provide valid information.
                                      </CInvalidFeedback>
                                    )}
                                  </CFormGroup>
                                </>
                              )}
                            </Field>
                            <Field name="comments">
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="comments">Comments</CLabel>
                                    <CTextarea
                                      {...input}
                                      rows="3"
                                      placeholder="Type Here..."
                                      onChange={input.onChange}
                                    />
                                  </CFormGroup>
                                </>
                              )}
                            </Field>
                            <Field name="receiptFile" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="receiptFile">
                                      Receipt
                                      <Required />
                                    </CLabel>
                                    <div className="mb-3">
                                      <CInput
                                        type="file"
                                        {...input}
                                        id="receiptFile"
                                        invalid={meta.invalid && meta.touched}
                                      />
                                    </div>
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

export default Receipt;
