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
  CBadge,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButtonGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import ESignature from "src/components/SiganturePadPaula";
import { useToasts } from "react-toast-notifications";
import { api } from "../../helpers/api";
import {
  SAVE_MATERIAL_REQUISITION,
  GET_MATERIAL_REQUISITION_BY_EMPLOYEE,
} from "../../helpers/urls/index";
import { useSelector, useStore } from "react-redux";

import arrayMutators from "final-form-arrays";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { materialRequisitionPrint } from "src/utils/materialRequisitionPrint";
import moment from "moment";

const fields = ["id", "qty", "size", "part#", "item"];
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

const MaterialRequisitionForm = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [details, setDetails] = useState([]);
  const [rows, setRow] = useState([{}, {}, {}, {}]);
  const [visible, setVisible] = useState(false);
  const { addToast } = useToasts();
  const [initialValues, setInitialValue] = useState({});
  const [materialReqId, setMaterialReqId] = useState([]);
  const user = useSelector((state) => {
    return state.user;
  });
  const [materialReqList, setmaterialReqList] = useState([]);
  const fullName =
    user.first_name && user.last_name
      ? user.first_name || "" + " " + user.last_name || ""
      : user.email
          .split("@")
          .shift()
          .split(".")
          .map((i) => {
            return i.charAt(0).toUppersCase() + i.slice(1) + " ";
          })
          .toString()
          .replace(",", "")
          .trim();
  useEffect(() => {
    fetchTable();
    setInitialValue({
      requestedBy: fullName,
      entryDate: moment().format("YYYY-MM-DD"),
    });
  }, []);
  const fetchTable = () => {
    api.get(GET_MATERIAL_REQUISITION_BY_EMPLOYEE).then((materialReq) => {
      console.log(materialReq);
      materialReq?.forEach((mr) => {
        mr.entryDate = moment(mr.entryDate).format("YYYY-MM-DD");
        mr.needBy = moment(mr.needBy).format("YYYY-MM-DD");
        mr.requestedBy =
          mr.requestedBy.firstName + " " + mr.requestedBy.lastName;
      });
      setmaterialReqList(materialReq);
    });
  };
  const Required = () => {
    return <span style={{ color: "red" }}>*</span>;
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

  const onSubmit = (e, form) => {
    // materialRequisitionPrint({
    //   jobLocation: e.jobLocation,
    //   jobName: e.jobName,
    //   needBy: e.needBy,
    //   requestedBy: e.requestedBy,
    //   rows: e.materialDetails,
    //   entryDate: e.entryDate,
    // });
    api
      .post(SAVE_MATERIAL_REQUISITION, {
        data: {
          material_requisition_id: e.id || "-1",
          job_name: e.jobName,
          job_location: e.jobLocation,
          requested_by: e.requestedBy,
          entry_date: e.entryDate,
          need_by: e.needBy,
          description: e.description,
          material_requisition_details: e.materialDetails,
          status: e.status,
        },
      })
      .then((result) => {
        setMaterialReqId(result?.id);
        setVisible(false);
        fetchTable();

        form.resetFieldState("jobName");
        form.resetFieldState("jobLocation");
        form.resetFieldState("needBy");
        form.reset({
          requestedBy: fullName,
          entryDate: moment().format("YYYY-MM-DD"),
        });

        addToast("Material Requisition Submitted.", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((error) => {
        console.log(error);
        addToast(
          "Something went wrong creating Material Requisition. Try again.",
          {
            appearance: "error",
            autoDismiss: true,
          }
        );
      });
  };
  const validate = () => {};
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader>
              Material Requisitions
              <div className="card-header-actions">
                <CButton
                  color="success"
                  className=" btn-minimize"
                  size="sm"
                  //type="submit"
                  onClick={() => {
                    setInitialValue({
                      requestedBy: fullName,
                      entryDate: moment().format("YYYY-MM-DD"),
                    });
                    setVisible(!visible);
                  }}
                >
                  Create
                </CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={materialReqList}
                fields={[
                  {
                    key: "edit",
                    _classes: "font-weight-bold",
                    label: " ",
                    _style: { width: "20px" },
                  },
                  "jobName",
                  "jobLocation",
                  "entryDate",
                  "needBy",
                  "status",
                ]}
                hover
                striped
                itemsPerPage={5}
                clickableRows
                onRowClick={(item) => {
                  setInitialValue(item);
                  setVisible(true);
                }}
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                  edit: (item) => (
                    <td>
                      <CButtonGroup size="sm">
                        <CButton color="info" size="sm">
                          <CIcon width={24} name="cil-pencil" />
                        </CButton>
                      </CButtonGroup>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CModal
          closeOnBackdrop={false}
          show={visible}
          onClose={() => setVisible(false)}
        >
          <CModalHeader closeButton>
            <CModalTitle>Create / Edit Material Requisition</CModalTitle>
          </CModalHeader>

          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialValues}
            mutators={{
              ...arrayMutators,
              setValue: ([field, value], state, { changeValue }) => {
                changeValue(state, field, () => value);
              },
            }}
            render={({
              handleSubmit,
              values,
              valid,
              setValues,
              form: {
                mutators: { push, pop, setValue },
              },
            }) => (
              <form onSubmit={handleSubmit}>
                <CModalBody>
                  <CRow>
                    <CCol sm="12">
                      <CRow>
                        <CCol sm="6">
                          <Field name="jobName" validate={required}>
                            {({ input, meta }) => (
                              <>
                                <CFormGroup>
                                  <CLabel htmlFor="jobName">
                                    Job Name
                                    <Required />
                                  </CLabel>
                                  <CInput
                                    type="text"
                                    id="jobName"
                                    invalid={meta.invalid && meta.touched}
                                    {...input}
                                    placeholder="Job Name"
                                    disabled={
                                      values.status == "OPEN"
                                        ? false
                                        : !values.id
                                        ? false
                                        : true
                                    }
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
                        </CCol>
                        <CCol sm="6">
                          <Field name="jobLocation" validate={required}>
                            {({ input, meta }) => (
                              <>
                                <CFormGroup>
                                  <CLabel htmlFor="jobLocation">
                                    Job Location
                                    <Required />
                                  </CLabel>
                                  <CInput
                                    type="text"
                                    id="jobLocation"
                                    invalid={meta.invalid && meta.touched}
                                    {...input}
                                    placeholder="Job Location"
                                    disabled={
                                      values.status == "OPEN"
                                        ? false
                                        : !values.id
                                        ? false
                                        : true
                                    }
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
                        </CCol>
                        <CCol sm="6">
                          <Field name="requestedBy" validate={required}>
                            {({ input, meta }) => (
                              <>
                                <CFormGroup>
                                  <CLabel htmlFor="requestedBy">
                                    Requested by
                                    <Required />
                                  </CLabel>
                                  <CInput
                                    disabled
                                    type="text"
                                    id="requestedBy"
                                    invalid={meta.invalid && meta.touched}
                                    {...input}
                                    placeholder="Requested By"
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
                        </CCol>
                        <CCol sm="6">
                          <Field name="entryDate" validate={required}>
                            {({ input, meta }) => (
                              <>
                                <CFormGroup>
                                  <CLabel htmlFor="entryDate">
                                    Today's Date
                                    <Required />
                                  </CLabel>
                                  <CInput
                                    type="date"
                                    id="entryDate"
                                    invalid={meta.invalid && meta.touched}
                                    {...input}
                                    placeholder="Today's Date"
                                    disabled={
                                      values.status == "OPEN"
                                        ? false
                                        : !values.id
                                        ? false
                                        : true
                                    }
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
                        </CCol>
                      </CRow>
                      <Field name="needBy" validate={required}>
                        {({ input, meta }) => (
                          <>
                            <CFormGroup>
                              <CLabel htmlFor="needBy">
                                Need by
                                <Required />
                              </CLabel>
                              <CInput
                                type="date"
                                id="needBy"
                                invalid={meta.invalid && meta.touched}
                                {...input}
                                placeholder="Need by"
                                disabled={
                                  values.status == "OPEN"
                                    ? false
                                    : !values.id
                                    ? false
                                    : true
                                }
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

                      <Field name="description">
                        {({ input, meta }) => (
                          <>
                            <CFormGroup row>
                              <CCol md="12">
                                <CLabel htmlFor="textarea-input">
                                  Description (Labor and Task)
                                </CLabel>
                              </CCol>
                              <CCol xs="12" md="12">
                                <CTextarea
                                  {...input}
                                  name="textarea-input"
                                  id="description"
                                  rows="3"
                                  placeholder="Enter the type of work in progress..."
                                  disabled={
                                    values.status == "OPEN"
                                      ? false
                                      : !values.id
                                      ? false
                                      : true
                                  }
                                />
                              </CCol>
                            </CFormGroup>
                          </>
                        )}
                      </Field>

                      <CCard>
                        <CCardHeader>Items</CCardHeader>
                        <CCardBody>
                          <FieldArray name="materialDetails">
                            {({ fields: items }) => (
                              <>
                                <CDataTable
                                  items={items.value}
                                  fields={[
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
                                  ]}
                                  striped
                                  scopedSlots={{
                                    id: (item, index) => {
                                      return (
                                        <td className="py-2">{index + 1}</td>
                                      );
                                    },
                                    quantity: (item, index) => {
                                      return (
                                        <td
                                          className="py-2"
                                          style={{ minWidth: 120 }}
                                        >
                                          <Field
                                            name={`materialDetails.${index}.quantity`}
                                          >
                                            {({ input: inputArray, meta }) => (
                                              <>
                                                <td
                                                  className="py-2"
                                                  style={{
                                                    minWidth: 120,
                                                  }}
                                                >
                                                  <CFormGroup>
                                                    <CInput
                                                      {...inputArray}
                                                      //id={metadataRow.key}
                                                      invalid={
                                                        meta.invalid &&
                                                        meta.touched
                                                      }
                                                      disabled={
                                                        values.status == "OPEN"
                                                          ? false
                                                          : !values.id
                                                          ? false
                                                          : true
                                                      }
                                                    />
                                                  </CFormGroup>
                                                </td>
                                              </>
                                            )}
                                          </Field>
                                        </td>
                                      );
                                    },
                                    size: (item, index) => {
                                      return (
                                        <td
                                          className="py-2"
                                          style={{ minWidth: 120 }}
                                        >
                                          <Field
                                            name={`materialDetails.${index}.size`}
                                          >
                                            {({ input: inputArray, meta }) => (
                                              <>
                                                <td
                                                  className="py-2"
                                                  style={{
                                                    minWidth: 120,
                                                  }}
                                                >
                                                  <CFormGroup>
                                                    <CInput
                                                      {...inputArray}
                                                      //id={metadataRow.key}
                                                      invalid={
                                                        meta.invalid &&
                                                        meta.touched
                                                      }
                                                      disabled={
                                                        values.status == "OPEN"
                                                          ? false
                                                          : !values.id
                                                          ? false
                                                          : true
                                                      }
                                                    />
                                                  </CFormGroup>
                                                </td>
                                              </>
                                            )}
                                          </Field>
                                        </td>
                                      );
                                    },
                                    partNumber: (item, index) => {
                                      return (
                                        <td
                                          className="py-2"
                                          style={{ minWidth: 120 }}
                                        >
                                          <Field
                                            name={`materialDetails.${index}.partNumber`}
                                          >
                                            {({ input: inputArray, meta }) => (
                                              <>
                                                <td
                                                  className="py-2"
                                                  style={{
                                                    minWidth: 120,
                                                  }}
                                                >
                                                  <CFormGroup>
                                                    <CInput
                                                      {...inputArray}
                                                      //id={metadataRow.key}
                                                      invalid={
                                                        meta.invalid &&
                                                        meta.touched
                                                      }
                                                      disabled={
                                                        values.status == "OPEN"
                                                          ? false
                                                          : !values.id
                                                          ? false
                                                          : true
                                                      }
                                                    />
                                                  </CFormGroup>
                                                </td>
                                              </>
                                            )}
                                          </Field>
                                        </td>
                                      );
                                    },
                                    itemDescription: (item, index) => {
                                      return (
                                        <td
                                          className="py-2"
                                          style={{ minWidth: 120 }}
                                        >
                                          <Field
                                            name={`materialDetails.${index}.itemDescription`}
                                          >
                                            {({ input: inputArray, meta }) => (
                                              <>
                                                <td
                                                  className="py-2"
                                                  style={{
                                                    minWidth: 120,
                                                  }}
                                                >
                                                  <CFormGroup>
                                                    <CInput
                                                      {...inputArray}
                                                      //id={metadataRow.key}
                                                      invalid={
                                                        meta.invalid &&
                                                        meta.touched
                                                      }
                                                      disabled={
                                                        values.status == "OPEN"
                                                          ? false
                                                          : !values.id
                                                          ? false
                                                          : true
                                                      }
                                                    />
                                                  </CFormGroup>
                                                </td>
                                              </>
                                            )}
                                          </Field>
                                        </td>
                                      );
                                    },
                                  }}
                                />
                                {(values.status == "OPEN" || !values.id) && (
                                  <CButton
                                    block
                                    color="dark"
                                    type="button"
                                    onClick={() => {
                                      push("materialDetails", {});
                                    }}
                                  >
                                    <CIcon size="lg" name="cil-plus" /> Add Row
                                  </CButton>
                                )}
                              </>
                            )}
                          </FieldArray>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </CModalBody>

                <CModalFooter>
                  <CButton
                    color="secondary"
                    style={{ marginRight: "auto" }}
                    onClick={() => setVisible(false)}
                  >
                    Close
                  </CButton>
                  {(values.status == "OPEN" || !values.id) && (
                    <>
                      <CButton
                        color="success"
                        type="submit"
                        onClick={() => {
                          if (!valid) {
                            addToast("Please complete empty fields.", {
                              appearance: "error",
                              autoDismiss: true,
                            });
                          } else {
                            setValue("status", "CLOSED");
                          }
                        }}
                      >
                        Ready to Order{" "}
                        <CIcon
                          color="white"
                          size="sm"
                          name="cil-check"
                          className="m-0"
                        />
                      </CButton>
                      <CButton
                        color="danger"
                        type="submit"
                        onClick={() => {
                          if (!valid) {
                            addToast("Please complete empty fields.", {
                              appearance: "error",
                              autoDismiss: true,
                            });
                          } else {
                            setValue("status", "OPEN");
                          }
                        }}
                      >
                        Save Changes
                      </CButton>
                    </>
                  )}
                </CModalFooter>
              </form>
            )}
          />
        </CModal>
      </CRow>
    </>
  );
};

export default MaterialRequisitionForm;
