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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import ESignature from "src/components/SiganturePadPaula";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { circuitHPrint, circuitPrint } from "src/utils/circuitPrint";
import CrudTable from "src/containers/CrudTable";
import moment from "moment";
import {
  GET_CIRCUIT_DIRECTORY,
  SAVE_CIRCUIT_DIRECTORY,
  CIRCUIT_DIRECTORY,
} from "src/helpers/urls";
import { api } from "src/helpers/api";
import { useToasts } from "react-toast-notifications";
import { useSelector } from "react-redux";

const required = (value) => (value ? undefined : "Required");

const fieldsTable = ["ckt", "load", "ckt1", "load1"];
const initialArray = [];
for (let index = 1; index < 43; index++) {
  const element = { ckt: index, load: "", ckt1: index + 1, load1: "" };
  initialArray.push(element);
  index++;
}
initialArray.push();

const CircuitDirectoryCrud = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const { addToast } = useToasts();
  const user = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    fetchTable();
  }, []);

  const onSubmit = function (e) {
    circuitPrint({
      date: e.date,
      voltage: e.voltage,
      rows,
    });
  };
  const validate = function () {};

  // const rows = [
  //   {
  //     id: 1,
  //     date: "2002-12-12",
  //     type: "business",
  //     voltage: "12 ",
  //     circuitDirectoryDetails: [
  //       {
  //         id: "1",
  //         ckt: "",
  //         load: "",
  //       },
  //     ],
  //   },
  //   {
  //     id: 1,
  //     date: "2002-12-12",
  //     type: "home",
  //     voltage: "12 ",
  //     circuitDirectoryDetails: [
  //       {
  //         id: "1",
  //         ckt: "",
  //         load: "",
  //       },
  //     ],
  //   },
  // ];
  //const [rows, setRow] = useState(rowsInitial);

  const metadata = [
    {
      key: "date",
      label: "Date",
      type: "date",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "type",
      label: "Type",
      options: [
        {
          label: "Business 208V",

          value: "BUSINESS_208V",
        },
        {
          label: "Business 480V",
          value: "BUSINESS_480V",
        },
        {
          label: "Home",
          value: "HOME",
        },
      ],
      type: "radius",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "voltage",
      label: "Voltage",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
    },
    {
      key: "circuitDirectoryDetails",
      label: "Details",
      type: "array",
      hide: true,
      shape: [
        // {
        //   key: "id",
        //   type: "idNumeric",
        // },
        {
          key: "ckt",
          type: "idNumeric",
          _style: { width: "20px" },
        },
        {
          key: "load",
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
  function fetchTable() {
    setLoading(true);
    return api.get(GET_CIRCUIT_DIRECTORY).then((circuitDirectory) => {
      setRows(
        (circuitDirectory || [])?.map((cd) => {
          return {
            ...cd,
            date: moment(cd.entryDate).format("YYYY-MM-DD"),
            voltage: cd.voltage,
            type: cd.circuitType.code,
            circuitDirectoryDetails: cd.circuitDetails,
          };
        })
      );
      setLoading(false);
    });
  }
  function onDelete(row, close) {
    api
      .delete(CIRCUIT_DIRECTORY, {
        data: {
          id: row.id,
        },
      })
      .then((data) => {
        fetchTable();
        addToast("Circuit Directory Removed.", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((error) => {
        addToast(" Something went wrong removing Circuit Directory.", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  }

  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                Circuit Directory
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
                    title="Circuit Directory"
                    rows={rows}
                    metadata={metadata}
                    onRefreshTable={fetchTable}
                    loading={loading}
                    onEdit={async (row, edittedRow) => {
                      try {
                        const e = edittedRow;
                        console.log(e);
                        await api.post(SAVE_CIRCUIT_DIRECTORY, {
                          circuit_directory_id: e.id,
                          entry_date: moment(e.entryDate).format("YYYY-MM-DD"),
                          voltage: e.voltage,
                          circuit_type_rc: e.type,
                          circuit_directory_details: e.circuitDirectoryDetails,
                        });

                        addToast("Circuit Directory Updated.", {
                          appearance: "success",
                          autoDismiss: true,
                        });
                        fetchTable();
                      } catch (error) {
                        addToast(
                          "Something went wrong Updating Circuit Directory. Try again.",
                          {
                            appearance: "error",
                            autoDismiss: true,
                          }
                        );
                        throw Error(error);
                      }
                    }}
                    onCreate={async (row) => {
                      try {
                        const e = row;
                        console.log(e);
                        await api.post(SAVE_CIRCUIT_DIRECTORY, {
                          circuit_directory_id: "-1",
                          entry_date: moment(e.entryDate).format("YYYY-MM-DD"),
                          voltage: e.voltage,
                          circuit_type_rc: e.type,
                          circuit_directory_details: e.circuitDirectoryDetails,
                        });

                        addToast("Circuit Directory Updated.", {
                          appearance: "success",
                          autoDismiss: true,
                        });
                        fetchTable();
                      } catch (error) {
                        addToast(
                          "Something went wrong Updating Circuit Directory. Try again.",
                          {
                            appearance: "error",
                            autoDismiss: true,
                          }
                        );
                        throw Error(error);
                      }
                    }}
                    onDelete={onDelete}
                    addOption={(row) => {
                      return (
                        <>
                          <CButton
                            color="secondary"
                            size="sm"
                            onClick={() => {
                              if (row.type.indexOf("BUSINESS") != -1) {
                                const initialArray = [];
                                for (let index = 1; index < 43; index++) {
                                  var cd = row.circuitDirectoryDetails.find(
                                    (d) => {
                                      return d.ckt === index;
                                    }
                                  );
                                  var cd2 = row.circuitDirectoryDetails.find(
                                    (d) => {
                                      return d.ckt === index + 1;
                                    }
                                  );

                                  const element = {
                                    ckt: index,
                                    load: cd?.load || "",
                                    ckt1: index + 1,
                                    load1: cd2?.load || "",
                                  };
                                  initialArray.push(element);
                                  index++;
                                }
                                circuitPrint({
                                  date: row.date,
                                  rows: initialArray,
                                  voltage: row.voltage,
                                });
                              } else {
                                const initialArray = [];
                                // for (let index = 0; index < 20; index++) {
                                //   var cd = row.circuitDirectoryDetails.find(
                                //     (d) => {
                                //       return d.id === index + 1;
                                //     }
                                //   );
                                //   const element = {
                                //     ckt: index + 1,
                                //     load: cd?.load || "",
                                //   };
                                //   initialArray.push(element);
                                // }
                                circuitHPrint({
                                  date: row.date,
                                  rows: row.circuitDirectoryDetails,
                                  voltage: row.voltage,
                                });
                              }
                              //circuitPrint
                              //toggleDetails(index)
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

export default CircuitDirectoryCrud;
