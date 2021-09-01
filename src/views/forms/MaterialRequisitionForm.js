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

const fields = ["id", "qty", "size", "part#", "item"];

const MaterialRequisitionForm = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [details, setDetails] = useState([]);
  const [rows, setRow] = useState([{}, {}, {}, {}]);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [checkedJobLocations, setCheckedJobLocations] = React.useState({});

  useEffect(() => {
    console.log("checked items: ", checkedJobLocations);
  }, [checkedJobLocations]);

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
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                Material Requisition Form
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
                  <CRow>
                    <CCol sm="12">
                      <CRow>
                        <CCol sm="6">
                          <CFormGroup>
                            <CLabel htmlFor="jobName">Job Name</CLabel>
                            <CInput
                              //size="sm"
                              type="text"
                              id="jobName"
                              name="input-small"
                              className="input-sm"
                              placeholder="Job Name"
                            />
                          </CFormGroup>
                        </CCol>
                        <CCol sm="6">
                          <CFormGroup>
                            <CLabel htmlFor="jobLocation">Job Location</CLabel>
                            <CInput
                              //size="sm"
                              type="text"
                              id="jobLocation"
                              name="jobLocation"
                              className="input-sm"
                              placeholder="Job Location"
                            />
                          </CFormGroup>
                        </CCol>
                        <CCol sm="6">
                          <CFormGroup>
                            <CLabel htmlFor="requestedBy">Requested by</CLabel>
                            <CInput
                              //size="sm"
                              type="text"
                              id="requestedBy"
                              name="requestedBy"
                              className="input-sm"
                              placeholder="Requested By"
                            />
                          </CFormGroup>
                        </CCol>
                        <CCol sm="6">
                          <CFormGroup>
                            <CLabel htmlFor="todayDate">Today's Date</CLabel>
                            <CInput
                              type="date"
                              id="todayDate"
                              name="todayDate"
                              placeholder="Today's Date"
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CFormGroup>
                        <CLabel htmlFor="needBy">Need by</CLabel>
                        <CInput
                          type="date"
                          id="needBy"
                          name="needBy"
                          placeholder="Today's Date"
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="description">
                          Description (Labor and Task
                        </CLabel>
                        <CTextarea
                          name="description"
                          id="description"
                          rows="9"
                          placeholder="Description..."
                        />
                      </CFormGroup>
                      <CCard>
                        <CCardHeader>Items</CCardHeader>
                        <CCardBody>
                          <CDataTable
                            items={rows}
                            fields={fields}
                            striped
                            itemsPerPage={50}
                            pagination
                            scopedSlots={{
                              id: (item, index) => {
                                return <td className="py-2">{index + 1}</td>;
                              },
                              qty: (item, index) => {
                                return (
                                  <td
                                    className="py-2"
                                    style={{ minWidth: 120 }}
                                  >
                                    <CInput
                                      type="text"
                                      placeholder="Qty"
                                      onChange={(e) => {
                                        const rowsT = [...rows];
                                        rowsT[index]["qty"] = e.target.value;
                                        setRow(rowsT);
                                      }}
                                    />
                                  </td>
                                );
                              },
                              size: (item, index) => {
                                return (
                                  <td
                                    className="py-2"
                                    style={{ minWidth: 120 }}
                                  >
                                    <CInput
                                      type="text"
                                      placeholder="Size"
                                      onChange={(e) => {
                                        const rowsT = [...rows];
                                        rowsT[index]["size"] = e.target.value;
                                        setRow(rowsT);
                                      }}
                                    />
                                  </td>
                                );
                              },
                              "part#": (item, index) => {
                                return (
                                  <td
                                    className="py-2"
                                    style={{ minWidth: 120 }}
                                  >
                                    <CInput
                                      type="text"
                                      placeholder="Part"
                                      onChange={(e) => {
                                        const rowsT = [...rows];
                                        rowsT[index]["part#"] = e.target.value;
                                        setRow(rowsT);
                                      }}
                                    />
                                  </td>
                                );
                              },
                              item: (item, index) => {
                                return (
                                  <td className="py-2">
                                    <CInput
                                      type="text"
                                      placeholder="Description"
                                      onChange={(e) => {
                                        const rowsT = [...rows];
                                        rowsT[index]["item"] = e.target.value;
                                        setRow(rowsT);
                                      }}
                                    />
                                  </td>
                                );
                              },
                            }}
                          />
                          <CButton
                            block
                            color="success"
                            type="button"
                            onClick={() => {
                              const rowsT = [...rows];
                              rowsT.push({});
                              setRow(rowsT);
                            }}
                          >
                            <CIcon size="lg" name="cil-plus" /> Add Row
                          </CButton>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCollapse>
              <CCardFooter>
                <CButton
                  block
                  color="success"
                  type="submit"
                  size="lg"
                  onClick={() => {}}
                >
                  <CIcon size="lg" name="cil-clock" /> Save
                </CButton>
              </CCardFooter>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default MaterialRequisitionForm;
