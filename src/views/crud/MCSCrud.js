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
  CDataTable,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import ESignature from "src/components/SiganturePadPaula";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { circuitPrint } from "src/utils/circuitPrint";
import CrudTable from "src/containers/CrudTable";
import { workOrderPrint } from "src/utils/workOrder";
import { MCS, GET_MCS, SAVE_MCS } from "src/helpers/urls";
import { api } from "src/helpers/api";
import { useToasts } from "react-toast-notifications";
import { useSelector } from "react-redux";
import moment from "moment";

const required = (value) => (value ? undefined : "Required");

const initialArray = [];
for (let index = 1; index < 43; index++) {
  const element = { ckt: index, load: "", ckt1: index + 1, load1: "" };
  initialArray.push(element);
  index++;
}
initialArray.push();

const MCSCrud = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [loading, setLoading] = useState(false);
  const [metadata, setMetaData] = useState([
    {
      key: "motor_hp",
      label: "Motor HP",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
    },
    {
      key: "nema_amp",
      label: "NEMA amp",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
    },
    {
      key: "starter_size",
      label: "Starter Size",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
    },
    {
      key: "overload",
      label: "Overload",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
    },
    {
      key: "mcp_type",
      label: "Motor Circuit Protector type HMCP",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
    },
    {
      key: "conduit_size",
      label: "Conduit Size",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
    },
    {
      key: "awg",
      label: "(AWG)",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
    },
    {
      key: "awg_gnd",
      label: "(AWG)GND)",
      type: "text",
      sorter: false,
      filter: false,
      _style: { minWidth: "120px" },
      required: true,
    },
  ]);
  useEffect(() => {}, []);

  const { addToast } = useToasts();

  const user = useSelector((state) => {
    return state.user;
  });

  const onSubmit = function (e) {};
  const validate = function () {};

  const [rows, setRows] = useState([]);
  //const [rows, setRow] = useState(rowsInitial);

  function onDelete(row, close) {
    return api
      .delete(MCS, {
        data: {
          id: row.id,
        },
      })
      .then(() => {
        addToast("MCS Removed.", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        console.log(err);
        addToast("Something went wrong. Try again.", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  }

  function parseData(row) {
    return {
      motor_hp: row.motor_hp,
      nema_amp: row.nema_amp,
      starter_size: row.starter_size,
      overload: row.overload,
      mcp_type: row.mcp_type,
      conduit_size: row.conduit_size,
      awg: row.awg,
      awg_gnd: row.awg_gnd,
      mcs_id: row.id,
    };
  }
  function fetchTable() {
    setLoading(true);
    return api.get(GET_MCS).then((mcss) => {
      setRows((mcss || []).map(parseData));
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
              <CCardHeader>Jobs</CCardHeader>
              <CCollapse show={true} timeout={1000}>
                <CCardBody>
                  <CrudTable
                    title="Motor Cheat Sheet 480V"
                    rows={rows}
                    metadata={metadata}
                    onRefreshTable={fetchTable}
                    loading={loading}
                    onEdit={(row, edittedRow) => {
                      const e = edittedRow;
                      return api
                        .post(SAVE_MCS, {
                          motor_hp: e.motor_hp,
                          nema_amp: e.nema_amp,
                          starter_size: e.starter_size,
                          overload: e.overload,
                          mcp_type: e.mcp_type,
                          conduit_size: e.conduit_size,
                          awg: e.awg,
                          awg_gnd: e.awg_gnd,
                          mcs_id: e.mcs_id,
                        })
                        .then((result) => {
                          addToast("MCS Updated", {
                            appearance: "success",
                            autoDismiss: true,
                          });
                          fetchTable();
                        })
                        .catch((error) => {
                          addToast(
                            "Something went wrong updating MCS. Try again.",
                            {
                              appearance: "error",
                              autoDismiss: true,
                            }
                          );
                          throw error;
                        });
                    }}
                    onCreate={(row) => {
                      const e = row;
                      return api
                        .post(SAVE_MCS, {
                          mcs_id: "-1",
                          motor_hp: row.motor_hp,
                          nema_amp: row.nema_amp,
                          starter_size: row.starter_size,
                          overload: row.overload,
                          mcp_type: row.mcp_type,
                          conduit_size: row.conduit_size,
                          awg: row.awg,
                          awg_gnd: row.awg_gnd,
                        })
                        .then((result) => {
                          addToast("MCS Created.", {
                            appearance: "success",
                            autoDismiss: true,
                          });
                        })
                        .catch((error) => {
                          addToast(
                            "Something went wrong creating MCS. Try again.",
                            {
                              appearance: "error",
                              autoDismiss: true,
                            }
                          );
                          throw error;
                        });
                    }}
                    onDelete={onDelete}
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

export default MCSCrud;
