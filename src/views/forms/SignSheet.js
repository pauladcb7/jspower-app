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
import { getBase64ImageFromURL } from "src/utils";
import moment from "moment";

const required = (value) => (value ? undefined : "Required");

const ListSheet = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [signatureCustomer, setSignatureCustomer] = useState(null);
  const [signatureEmployee, setSignatureEmployee] = useState(null);
  const [showElements, setShowElements] = React.useState(true);
  const [document, setDocument] = React.useState(null);
  const [b64, setB64] = useState("");
  const [currentDocument, setCurrentDocument] = useState("");
 
  const onSubmit = async function (e) {
    let document2 = currentDocument;
    const companyName = "JSPOWEREELECTRICINC"
    const {
      jobLocation,
      personalSafetyViolations,
      safetySuggestion,
      timeFinished,
      timeStarted,
      employeeSignature,
      supervisorSignature
    } = e;
    debugger
    document2.pageMargins = [15, 22, 15, 5]
    document2.styles = {
      'html-p': {
        marginTop: 0,
        marginBottom: 0,
        margin: [0, 0, 0, 0] // it will add a yellow background to all <STRONG> elements
      },
      'html-strong': {
        margin: [0, 0, 0, 0] // it will add a yellow background to all <STRONG> elements
      },
      'html-span': {
        margin: [0, 0, 0, 0] // it will add a yellow background to all <STRONG> elements
      },
      'html-ul': {
        margin: [0, 0, 0, 0]
      }
    }
    const logo = (await import('../../assets/logopdf.png')).default;
    const logo2 = (await import('../../assets/logoBg.png')).default;
    document2.images.logo = await getBase64ImageFromURL(logo);
    document2.images.logo2 = await getBase64ImageFromURL(logo2);
    employeeSignature.forEach((es,index) => {
      document2.images['sign' + index] = es.signature  
    });
    document2.images.supervisorSignature= supervisorSignature  
    
    document2.content.unshift(
      {
        image: 'logo',
        fit: [80, 80],
        absolutePosition: { x: 15, y: 65 }
      },
      {
        //layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 0,
          widths: ['*'],

          body: [
            [
              {
                text: `Company Name:____${companyName}        Job Location: __${jobLocation}___       Date: ___${moment().format("YYYY-MM-DD")}________`,
                font: "Calibri"
              }
            ],
            [
              {
                text: `Time Started: _${moment(timeStarted, "HH:mm").format('hh:mm a')}_ Time Finished: _${moment(timeFinished, "HH:mm").format('hh:mm a')}_ Foreman/Supervisor:___Nose____`,
                font: "Calibri"
              }]
          ]
        },

        layout: {
          hLineWidth: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 1 : 0;
          },
          vLineWidth: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 1 : 0;
          },
          hLineColor: function (i, node) {
            return 'black';
          },
          vLineColor: function (i, node) {
            return 'black';
          },
          hLineStyle: function (i, node) {
            if (i === 0 || i === node.table.body.length) {
              return null;
            }
            return { dash: { length: 10, space: 4 } };
          },
          vLineStyle: function (i, node) {
            if (i === 0 || i === node.table.widths.length) {
              return null;
            }
            return { dash: { length: 4 } };
          },
          // paddingLeft: function(i, node) { return 4; },
          // paddingRight: function(i, node) { return 4; },
          // paddingTop: function(i, node) { return 2; },
          // paddingBottom: function(i, node) { return 2; },
          // fillColor: function (i, node) { return null; }
        }
      })
      
      
    document2.content.push(
      {
        text: `Work-Site Hazards and Safety Suggestions: _____________${personalSafetyViolations}________.`,
        font: "Calibri"
      },
      {
        text: `Personnel Safety Violations: ____________${safetySuggestion}_________________________.`,
        font: "Calibri"
      },
      {
        text: 'Employee Signatures:                  (My signature attests and verifies my understanding of and agreement to comply with company safety regulations).',
        font: "Calibri"
      },
      {
        columns: [{
          // auto-sized columns have their widths based on their content
          width: '*',
          columns: [
            {
              width: 12,
              text: '1. ',
              font: "Calibri"
            },
            {
              ...(
                employeeSignature[0] ? {
                image:'sign0',
                fit: [150, 40],
              }: {
              }),
            }
          ]
        },
        {
          // star-sized columns fill the remaining space
          // if there's more than one star-column, available width is divided equally
          width: '*',
          columns: [
            {
              width: 12,
              text: '2. ',
              font: "Calibri"
            },
            {
              ...(
                employeeSignature[1] ? {
                image:'sign1',
                fit: [150, 40],
              }: {
              }),
            }
          ]
        },
        {
          // fixed width
          width: '*',
          columns: [
            {
              width: 12,
              text: '3. ',
              font: "Calibri"
            },
            {
              ...(
                employeeSignature[2] ? {
                image:'sign2',
                fit: [150, 40],
              }: {
              }),
            }
          ]
        },
        ],
        width: '100%'
      },
      {
        columns: [{
          // auto-sized columns have their widths based on their content
          width: '*',
          columns: [
            {
              width: 12,
              text: '4. ',
              font: "Calibri"
            },
            {
              ...(
                employeeSignature[3] ? {
                image:'sign3',
                fit: [150, 40],
              }: {
              }),
            }
          ]
        },
        {
          // star-sized columns fill the remaining space
          // if there's more than one star-column, available width is divided equally
          width: '*',
          columns: [
            {
              width: 12,
              text: '5. ',
              font: "Calibri"
            },
            {

              ...(
                employeeSignature[4] ? {
                image:'sign4',
                fit: [150, 40],
              }: {
              }),
            }
          ]
        },
        {
          // fixed width
          width: '*',
          columns: [
            {
              width: 12,
              text: '6. ',
              font: "Calibri"
            },
            {

              ...(
                employeeSignature[5] ? {
                image:'sign5',
                fit: [150, 40],
              }: {
              }),
            }
          ]
        },
        ],
        width: '100%'
      },
      {
        columns: [{
          // auto-sized columns have their widths based on their content
          width: '*',
          columns: [
            {
              width: 12,
              text: '7. ',
              font: "Calibri"
            },
            {

              ...(
                employeeSignature[6] ? {
                image:'sign6',
                fit: [150, 40],
              }: {
              }),
            }
          ]
        },
        {
          // star-sized columns fill the remaining space
          // if there's more than one star-column, available width is divided equally
          width: '*',
          columns: [
            {
              width: 12,
              text: '8. ',
              font: "Calibri"
            },
            {

              ...(
                employeeSignature[7] ? {
                image:'sign7',
                fit: [150, 40],
              }: {
              }),
            }
          ]
        },
        {
          // fixed width
          width: '*',
          columns: [
            {
              width: 12,
              text: '9. ',
              font: "Calibri"
            },
            {

              ...(
                employeeSignature[8] ? {
                image:'sign8',
                fit: [150, 40],
              }: {
              }),
            }
          ]
        },
        ],
        width: '100%'
      },
      {
        columns: [{
          // auto-sized columns have their widths based on their content
          width: '*',

          columns: [
            {
              width: 12,
              text: '10. ',
              font: "Calibri"
            },
            {

              ...(
                employeeSignature[9] ? {
                image:'sign9',
                fit: [150, 40],
              }: {
              }),
            }
          ]
        },
        {
          // star-sized columns fill the remaining space
          // if there's more than one star-column, available width is divided equally
          width: '*',

          columns: [
            {
              width: 12,
              text: '11. ',
              font: "Calibri"
            },
            {

              ...(
                employeeSignature[10] ? {
                image:'sign10',
                fit: [150, 40],
              }: {
              }),
            }
          ]
        },
        {
          // fixed width
          width: '*',

          columns: [
            {
              width: 12,
              text: '12. ',
              font: "Calibri"
            },
            {

              ...(
                employeeSignature[11] ? {
                image:'sign11',
                fit: [150, 40],
              }: {
              }),
            }
          ]
        },
        ],
        width: '100%'
      },
      {
        
        columns: [
          {
            width: '*',
            alignment: 'right',
            text: 'Foreman/Supervisor’s Signature:',
            font: "Calibri"
          },
          {
            width: 150,
            
            ...(
              supervisorSignature ? {
              image:'supervisorSignature',
              fit: [150, 150],
            }: {
            }),
          }
        ]
      })
    document2.background = [
      {
        image: 'logo2',
        width: 420,
        fit: [420, 420],
        marginTop: 120,
        alignment: 'center',
      }
    ]

    getPDfInstance().then((pdfMake) => {
      pdfMake.createPdf(document2).download();
      /* getBase64((res) => {
        setB64(res)
      }) */
    })
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
        setCurrentDocument(html)
        /* var document2 = htmlToPdfmake(html, {
          imagesByReference: true,
        }); */

        getPDfInstance().then((pdfMake) => {
          pdfMake.createPdf(html).getBase64((res) => {
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
                            {/* <div dangerouslySetInnerHTML={{
                               __html: currentDocument.customHtml
                            }}></div> */}
                            {/* {JSON.stringify(currentDocument.customHtml)} */}
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
                            <Field name={`supervisorSignature`}>
                              {({ input: inputArray, meta }) => (
                                <>
                                  <CLabel >
                                    Supervisor signature
                                  </CLabel>
                                  <ESignature
                                    svg={inputArray.value}
                                    onChange={inputArray.onChange}
                                  ></ESignature>
                                </>
                              )}
                            </Field>
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
