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
  CRow,
  CBadge,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import ESignature from "src/components/SiganturePadPaula";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { circuitPrint } from "src/utils/circuitPrint";
import { getPDfInstance } from "src/utils/pdf";
import { getBase64ImageFromURL } from "src/utils";
import CrudTable from "src/containers/CrudTable";
import { useToasts } from "react-toast-notifications";
import { materialRequisitionPrint } from "src/utils/materialRequisitionPrint";
import {
  SAVE_SAFETY_SHEET,
  GET_SAFETY_SHEET,
  SAFETY_SHEET,
} from "src/helpers/urls";
import { api } from "src/helpers/api";
import moment from "moment";
import { documents } from "src/constants/files";
import axios from "axios";

const required = (value) => (value ? undefined : "Required");
const getBadge = (status) => {
  switch (status) {
    case "OPEN":
      return "success";
    case "CLOSED":
      return "danger";
    default:
      return "primary";
  }
};
const fieldsTable = ["ckt", "load", "ckt1", "load1"];
const initialArray = [];
for (let index = 1; index < 43; index++) {
  const element = { ckt: index, load: "", ckt1: index + 1, load1: "" };
  initialArray.push(element);
  index++;
}
initialArray.push();

const SafetySheetCrud = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const { addToast } = useToasts();
  const [checkedJobLocations, setCheckedJobLocations] = React.useState({});
  useEffect(() => {}, []);

  const handleChange = (event) => {
    // updating an object instead of a Map
    setCheckedJobLocations({
      ...checkedJobLocations,
      [event.target.name]: event.target.checked,
      [event.target.name]: event.target.checked,
    });
  };

  const toggleMulti = (type) => {
    let newCollapse = collapseMulti.slice();
    switch (type) {
      case "left":
        newCollapse[0] = !collapseMulti[0];
        break;
      case "right":
        newCollapse[1] = !collapseMulti[1];
        break;
      case "both":
        newCollapse[0] = !collapseMulti[0];
        newCollapse[1] = !collapseMulti[1];
        break;
      default:
    }
    setCollapseMulti(newCollapse);
  };
  const onSubmit = function (e) {
    circuitPrint({
      date: e.date,
      voltage: e.voltage,
      rows,
    });
  };
  const validate = function () {};

  const metadata = [
    {
      key: "jobLocation",
      label: "Job Location",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "supervisor",
      label: "Supervisor",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "190px" },
    },
    {
      key: "entryDate",
      label: "Entry Date",
      type: "date",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
    },
    {
      key: "startTime",
      label: "Time Started",
      type: "date",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
    },
    {
      key: "endTime",
      label: "Time Finished",
      type: "date",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
    },
    {
      key: "safetySuggestions",
      label: "Work-Site Hazards and Safety Suggestions",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
    },
    {
      key: "safetyViolations",
      label: "Personnel Safety Violations",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "100px" },
    },

    {
      key: "materialDetails",
      label: "Job Details",
      type: "array",
      shape: [
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
      ],
      sorter: false,
      filter: false,
      _style: { minWidth: "160px" },
      hide: true,
    },
  ];
  function onDelete(row, close) {
    api
      .delete(SAFETY_SHEET, {
        data: {
          id: row.id,
        },
      })
      .then(() => {
        addToast("Safety Sheet Removed.", {
          appearance: "success",
          autoDismiss: true,
        });
        fetchTable();
      })
      .catch((err) => {
        console.log(err);
        addToast("Something went wrong. Try again.", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  }

  function fetchTable() {
    setLoading(true);
    return api.get(GET_SAFETY_SHEET).then((safetySheet) => {
      setRows(
        (safetySheet || [])?.map((ss) => {
          return {
            ...ss,
            entryDate: moment(ss.entryDate).format("YYYY-MM-DD"),
            safetySuggestions: ss.safetySuggestions || "",
            safetyViolations: ss.safetyViolations || "",
            supervisor:
              ss.supervisor?.firstName ||
              "" + " " + ss.supervisor?.lastName ||
              "",
          };
        })
      );
      setLoading(false);
    });
  }
  useEffect(() => {
    fetchTable();
  }, []);
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                Safety Sheets
                <div className="card-header-actions">
                  <CButton
                    color="link"
                    className="card-header-action btn-minimize"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <CIcon
                      name={collapsed ? "cil-arrow-top" : "cil-arrow-bottom"}
                    />
                  </CButton>
                </div>
              </CCardHeader>
              <CCollapse show={collapsed} timeout={1000}>
                <CCardBody>
                  <CrudTable
                    loading={loading}
                    title="Safety Sheet"
                    rows={rows}
                    metadata={metadata}
                    onEdit={(row, edittedRow) => {
                      console.log(edittedRow);
                    }}
                    disableEdit
                    onRefreshTable={fetchTable}
                    onCreate={(row) => {}}
                    onDelete={onDelete}
                    addOption={(row) => {
                      return (
                        <>
                          <CButton
                            color="secondary"
                            size="sm"
                            onClick={async () => {
                              const document = documents.find((d) => {
                                return d.id === row.safetySheetType;
                              });
                              if (document) {
                                axios
                                  .get(`/pdfs/${document.filePath}`)
                                  .then(async (response) => {
                                    var html = response.data;

                                    let document2 = { ...html };
                                    const companyName = "JSPOWEREELECTRICINC";
                                    const {
                                      jobLocation,
                                      personalSafetyViolations,
                                      safetySuggestion,
                                      endTime: timeFinished,
                                      startTime: timeStarted,
                                      employees: employeeSignature,
                                      supervisorSignature,
                                      supervisor,
                                    } = row;

                                    document2.pageMargins = [25, 22, 25, 5];
                                    document2.styles = {
                                      "html-p": {
                                        marginTop: 0,
                                        marginBottom: 0,
                                        margin: [0, 0, 0, 0], // it will add a yellow background to all <STRONG> elements
                                      },
                                      "html-strong": {
                                        margin: [0, 0, 0, 0], // it will add a yellow background to all <STRONG> elements
                                      },
                                      "html-span": {
                                        margin: [0, 0, 0, 0], // it will add a yellow background to all <STRONG> elements
                                      },
                                      "html-ul": {
                                        margin: [0, 0, 0, 0],
                                      },
                                    };
                                    const logo = (
                                      await import("../../assets/logopdf.png")
                                    ).default;
                                    const logo2 = (
                                      await import("../../assets/logoBg.png")
                                    ).default;
                                    const blankImg = (
                                      await import("../../assets/blank.png")
                                    ).default;
                                    document2.images.logo =
                                      await getBase64ImageFromURL(logo);
                                    document2.images.logo2 =
                                      await getBase64ImageFromURL(logo2);
                                    const blank = await getBase64ImageFromURL(
                                      blankImg
                                    );
                                    employeeSignature.forEach((es, index) => {
                                      document2.images["sign" + index] =
                                        es.signature || blank;
                                    });
                                    document2.images.supervisorSignature =
                                      supervisorSignature || blank;
                                    const t1 = [...document2.content];
                                    t1.unshift(
                                      {
                                        image: "logo",
                                        fit: [80, 80],
                                        absolutePosition: { x: 15, y: 65 },
                                      },
                                      {
                                        //layout: 'lightHorizontalLines', // optional
                                        table: {
                                          // headers are automatically repeated if the table spans over multiple pages
                                          // you can declare how many rows should be treated as headers
                                          headerRows: 0,
                                          widths: ["*"],

                                          body: [
                                            [
                                              {
                                                text: `Company Name: ${companyName}        Job Location: ${jobLocation}       Date: ${moment().format(
                                                  "YYYY-MM-DD"
                                                )}`,
                                                font: "Calibri",
                                              },
                                            ],
                                            [
                                              {
                                                text: `Time Started: ${moment(
                                                  timeStarted,
                                                  "HH:mm"
                                                ).format(
                                                  "hh:mm a"
                                                )} Time Finished: ${moment(
                                                  timeFinished,
                                                  "HH:mm"
                                                ).format(
                                                  "hh:mm a"
                                                )} Foreman/Supervisor: ${supervisor}`,
                                                font: "Calibri",
                                              },
                                            ],
                                          ],
                                        },

                                        layout: {
                                          hLineWidth: function (i, node) {
                                            return i === 0 ||
                                              i === node.table.body.length
                                              ? 1
                                              : 0;
                                          },
                                          vLineWidth: function (i, node) {
                                            return i === 0 ||
                                              i === node.table.widths.length
                                              ? 1
                                              : 0;
                                          },
                                          hLineColor: function (i, node) {
                                            return "black";
                                          },
                                          vLineColor: function (i, node) {
                                            return "black";
                                          },
                                          hLineStyle: function (i, node) {
                                            if (
                                              i === 0 ||
                                              i === node.table.body.length
                                            ) {
                                              return null;
                                            }
                                            return {
                                              dash: { length: 10, space: 4 },
                                            };
                                          },
                                          vLineStyle: function (i, node) {
                                            if (
                                              i === 0 ||
                                              i === node.table.widths.length
                                            ) {
                                              return null;
                                            }
                                            return { dash: { length: 4 } };
                                          },
                                          // paddingLeft: function(i, node) { return 4; },
                                          // paddingRight: function(i, node) { return 4; },
                                          // paddingTop: function(i, node) { return 2; },
                                          // paddingBottom: function(i, node) { return 2; },
                                          // fillColor: function (i, node) { return null; }
                                        },
                                      }
                                    );

                                    var result = [];
                                    employeeSignature.forEach(
                                      (employtee, index) => {
                                        let dEmployee = {
                                          // auto-sized columns have their widths based on their content
                                          width: "*",
                                          columns: [
                                            {
                                              width: 12,
                                              text: `${index + 1}. `,
                                              font: "Calibri",
                                            },
                                            {
                                              image: "sign" + index,
                                              fit: [150, 40],
                                            },
                                          ],
                                        };
                                        if (result[Math.floor(index / 3)]) {
                                          result[
                                            Math.floor(index / 3)
                                          ].columns.push(dEmployee);
                                        } else {
                                          result[Math.floor(index / 3)] = {
                                            columns: [],
                                            width: "100%",
                                          };
                                          result[
                                            Math.floor(index / 3)
                                          ].columns.push(dEmployee);
                                        }
                                      }
                                    );

                                    t1.push(
                                      {
                                        text: `Work-Site Hazards and Safety Suggestions: ${personalSafetyViolations}.`,
                                        font: "Calibri",
                                      },
                                      {
                                        text: `Personnel Safety Violations: ${safetySuggestion}.`,
                                        font: "Calibri",
                                      },
                                      {
                                        text: "Employee Signatures:        (My signature attests and verifies my understanding of and agreement to comply with company safety regulations).",
                                        font: "Calibri",
                                      },
                                      ...result,
                                      {
                                        columns: [
                                          {
                                            width: "*",
                                            alignment: "right",
                                            text: "Foreman/Supervisor’s Signature:",
                                            font: "Calibri",
                                          },
                                          {
                                            width: 150,

                                            ...(supervisorSignature
                                              ? {
                                                  image: "supervisorSignature",
                                                  fit: [150, 150],
                                                }
                                              : {}),
                                          },
                                        ],
                                      }
                                    );

                                    document2.content = t1;
                                    document2.background = [
                                      {
                                        image: "logo2",
                                        width: 420,
                                        fit: [420, 420],
                                        marginTop: 120,
                                        alignment: "center",
                                      },
                                    ];

                                    getPDfInstance().then((pdfMake) => {
                                      pdfMake.createPdf(document2).download();
                                      /* getBase64((res) => {
                                      setB64(res)
                                    }) */
                                    });
                                  });
                              }
                            }}
                          >
                            <CIcon width={24} name="cil-print" />
                          </CButton>
                        </>
                      );
                    }}
                  ></CrudTable>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default SafetySheetCrud;
