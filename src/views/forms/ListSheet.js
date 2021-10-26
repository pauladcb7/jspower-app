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
import { Field, Form } from "react-final-form";
import { workOrderPrint } from "src/utils/workOrder";
import { useHistory } from "react-router";
import { documents } from "src/constants/files";

const required = (value) => (value ? undefined : "Required");

const ListSheet = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const jobLocations = [
    { name: "ceres", key: "jLocation1", label: "Ceres" },
    { name: "frito-lay", key: "jLocation2", label: "Frito Lay" },
    { name: "lodi-bowling", key: "jLocation3", label: "Lodi Bowling" },
    { name: "modesto", key: "jLocation4", label: "Modesto" },
    { name: "pepsico", key: "jLocation5", label: "PepsiCo" },
    {
      name: "sensient-livingston",
      key: "jLocation6",
      label: "Sensient Livingston",
    },
    { name: "sensient-turlock", key: "jLocation7", label: "Sensient Turlock" },
    { name: "Other", key: "jLocation8", label: "Other" },
  ];
  const [checkedJobLocations, setCheckedJobLocations] = React.useState({});

  useEffect(() => {}, [checkedJobLocations]);

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
  const [signatureCustomer, setSignatureCustomer] = useState(null);
  const [signatureEmployee, setSignatureEmployee] = useState(null);
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

  const history = useHistory();

  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <CCard>
                    <CCardHeader>
                      Sheet List
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
                            <CDataTable
                              items={documents}
                              fields={[
                                {
                                  key: "view",
                                  label: " ",
                                  sorter: false,
                                  filter: false,
                                  _style: { width: "20px" },
                                },
                                {
                                  key: "fileName",
                                  label: "File Name",
                                  sorter: false,
                                  filter: false,
                                  _style: { minWidth: "120px" },
                                },
                              ]}
                              striped
                              scopedSlots={{
                                view: (row) => {
                                  return (
                                    <td
                                      className="py-2"
                                      style={{
                                        minWidth: 100,
                                      }}
                                    >
                                      <CButton
                                        color="primary"
                                        variant="outline"
                                        shape="square"
                                        size="sm"
                                        onClick={() => {
                                          //toggleDetails(index)
                                          history.push(
                                            `/safety-sheets/sign/${row.id}`
                                          );
                                        }}
                                      >
                                        <CIcon width={24} name="cil-pencil" />{" "}
                                        Sign
                                      </CButton>
                                    </td>
                                  );
                                },
                              }}
                            />
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCollapse>
                    <CCardFooter>
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
