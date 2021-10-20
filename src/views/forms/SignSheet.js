import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ESignature from "src/components/SiganturePadPaula";
import { Field, Form } from "react-final-form";
import { workOrderPrint } from "src/utils/workOrder";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { documents } from "src/constants/files";
import { useParams } from "react-router";
import axios from "axios";
import htmlToPdfmake from "html-to-pdfmake";
import { getPDfInstance } from "src/utils/pdf";

const required = (value) => (value ? undefined : "Required");

const ListSheet = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [signatureCustomer, setSignatureCustomer] = useState(null);
  const [signatureEmployee, setSignatureEmployee] = useState(null);
  const [showElements, setShowElements] = React.useState(true);
  const [document, setDocument] = React.useState(null);
  const [b64, setB64] = useState("");

  const onSubmit = function (e) {
    if (!signatureCustomer.isEmpty() && !signatureEmployee.isEmpty()) {
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
  const params = useParams();
  useEffect(() => {
    const document = documents.find((d) => {
      return d.id === params.idFile;
    });
    if (document) {
      axios.get(`/pdfs/${document.filePath}`).then((response) => {
        var html = response.data;
        var document2 = htmlToPdfmake(html, {
          imagesByReference: true,
        });

        getPDfInstance().then((pdfMake) => {
          pdfMake.createPdf(document2).getBase64((res) => {
            setB64(res);
          });
        });
      });
    }
  }, []);
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              mutators={{
                ...arrayMutators,
              }}
              render={({
                handleSubmit,
                form: {
                  mutators: { push, pop },
                },
                valid,
              }) => (
                <form onSubmit={handleSubmit}>
                  <CCard>
                    <CCardHeader>
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
                            <Field name="jobLocation" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="jobLocation">
                                      Job Location
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
                            <Field name="timeStarted" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="timeStarted">
                                      Time Started
                                    </CLabel>
                                    <CInput
                                      type="time"
                                      id="timeStarted"
                                      invalid={meta.invalid && meta.touched}
                                      {...input}
                                      placeholder="Time Started"
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

                            <Field name="timeFinished" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="timeFinished">
                                      Time Finished
                                    </CLabel>
                                    <CInput
                                      type="time"
                                      id="timeFinished"
                                      invalid={meta.invalid && meta.touched}
                                      {...input}
                                      placeholder="Time Finished"
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
                            {/* <object className="pdf-viewer" data={`/pdfs/${document?.filePath}`} type="application/pdf">
                                <embed src="/pdfs/01. PPE.docx.pdf" type="application/pdf" />
                            </object> */}

                            <object
                              className="pdf-viewer"
                              data={"data:application/pdf;base64," + b64}
                              type="application/pdf"
                            >
                              <embed
                                src={"data:image/png;base64," + b64}
                                type="application/pdf"
                              />
                            </object>
                            <Field name="safetySuggestion" validate={required}>
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="safetySuggestion">
                                      Work-Site Hazards and Safety Suggestion
                                    </CLabel>
                                    <CInput
                                      type="text"
                                      id="safetySuggestion"
                                      invalid={meta.invalid && meta.touched}
                                      {...input}
                                      placeholder=""
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
                            <Field
                              name="personalSafetyViolations"
                              validate={required}
                            >
                              {({ input, meta }) => (
                                <>
                                  <CFormGroup>
                                    <CLabel htmlFor="personalSafetyViolations">
                                      Personnel Safety Violations
                                    </CLabel>
                                    <CInput
                                      type="text"
                                      id="personalSafetyViolations"
                                      invalid={meta.invalid && meta.touched}
                                      {...input}
                                      placeholder=""
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

                            <FieldArray name="employeeSignature">
                              {({ fields: items }) => (
                                <>
                                  {items.map((name, index) => (
                                    <div key={name}>
                                      <Field
                                        name={`${name}.name`}
                                        validate={required}
                                      >
                                        {({ input: inputArray, meta }) => (
                                          <>
                                            <CLabel htmlFor="employeeName">
                                              Employee Name
                                            </CLabel>
                                            <CInput
                                              {...inputArray}
                                              invalid={
                                                meta.invalid && meta.touched
                                              }
                                            />
                                            {meta.touched && meta.error && (
                                              <CInvalidFeedback className="help-block">
                                                Please provide a valid
                                                information
                                              </CInvalidFeedback>
                                            )}
                                          </>
                                        )}
                                      </Field>
                                      <Field name={`${name}.signature`}>
                                        {({ input: inputArray, meta }) => (
                                          <>
                                            <CLabel htmlFor="employeeName">
                                              Employee Signature
                                            </CLabel>
                                            <ESignature
                                              svg={inputArray.value}
                                              onChange={inputArray.onChange}
                                            ></ESignature>
                                          </>
                                        )}
                                      </Field>
                                      <CButton
                                        block
                                        color="danger"
                                        type="button"
                                        className="my-3"
                                        onClick={() => {
                                          items.remove(index);
                                        }}
                                      >
                                        <CIcon size="lg" name="cil-minus" />{" "}
                                        Remove Employee
                                      </CButton>
                                    </div>
                                  ))}
                                  {/* 
                                  <CFormGroup>
                                    <CInput
                                      {...inputArray}
                                      //id={metadataRow.key}
                                      invalid={meta.invalid && meta.touched}
                                    />
                                  </CFormGroup> */}
                                  <CButton
                                    block
                                    color="dark"
                                    type="button"
                                    onClick={() => {
                                      push("employeeSignature", {});
                                    }}
                                  >
                                    <CIcon size="lg" name="cil-plus" /> Add
                                    Employee
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
                </form>
              )}
            />
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default ListSheet;
