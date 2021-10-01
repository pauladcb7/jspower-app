import React, { useEffect, useState } from "react";
import {
  CButton,
  CDataTable,
  CFormGroup,
  CInput,
  CInputRadio,
  CInvalidFeedback,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTextarea,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Field, Form } from "react-final-form";
import ESignature from "src/components/SiganturePadPaula";
import { FieldArray, mu } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const CrudTable = ({
  rows = [
    {
      id: 1,
      name: "jhon",
      lastName: "doe",
    },
  ],
  metadata = [
    {
      key: "name",
      label: "Name",
      type: "text",
      sorter: false,
      filter: false,
      hide: false,
    },
  ],
  title = "",
  onEdit = () => {},
  onDelete = () => {},
  onCreate = () => {},
  onRead = () => {},
  onRefreshTable = () => {},
  addOption = () => {
    return null;
  },
  loading
}) => {
  const [modal, setModal] = useState(false);
  const [reRender, setRerender] = useState(uuid());
  const [selectedData, setSelectedData] = useState(null);
  async function onSubmit(newData) {
    if (selectedData) {
      await onEdit(selectedData, newData);
    } else {
      await onCreate(newData);
    }
    setModal(false);
  }

  useEffect(() => {
    setRerender(uuid());
  }, [modal]);

  function validate() {}

  async function downloadXls() {
    const XLSX = (await import("xlsx")).default;

    /* var data = [
      { name: "Barack Obama", pres: 44 },
      { name: "Donald Trump", pres: 45 }
    ]; */
    const data = rows.map((row) => {
      return metadata.reduce((previous, current) => {
        if (!current.hide) {
          previous.push(row[current.key]);
        }
        return previous;
      }, []);
    });
    //metadata
    var heading = [
      metadata.reduce((previous, current) => {
        if (!current.hide) {
          previous.push(current.label);
        }
        return previous;
      }, []),
    ];
    const ws = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, heading);
    XLSX.utils.sheet_add_aoa(ws, data, {
      origin: "A2",
    });

    function fitToColumn(arrayOfArray) {
      return arrayOfArray[0].map((a, i) => ({
        wch:
          Math.max(
            ...arrayOfArray.map((a2) => (a2[i] ? a2[i].toString().length : 0))
          ) + 5,
      }));
    }
    var wholeRange = XLSX.utils.decode_range(ws["!ref"]);
    var range = XLSX.utils.encode_range(
      {
        c: wholeRange.s.c,
        r: 0,
      },
      {
        c: wholeRange.e.c,
        r: 0,
      }
    );
    ws["!autofilter"] = { ref: range };
    ws["!cols"] = fitToColumn([...heading, ...[data[0]]]);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet");
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }

  return (
    <>
      <CButton
        playsInline
        color="dark"
        type="button"
        onClick={() => {
          setSelectedData(null);
          setModal(true);
        }}
      >
        <CIcon size="lg" name="cil-plus" /> Add Row
      </CButton>{" "}
      <CButton
        playsInline
        color="dark"
        type="button"
        onClick={() => {
          downloadXls();
        }}
      >
        <CIcon size="lg" name="cil-cloud-download" />
      </CButton>{" "}
      <CButton
        playsInline
        color="dark"
        type="button"
        onClick={async () => {
          await onRefreshTable();
          // TODO: Only to DEMO show like a blink
        }}
      >
        <CIcon size="lg" name="cil-sync" />
      </CButton>
      <CDataTable
        striped
        loading={loading}
        hover
        items={rows}
        tableFilter
        tablfi
        fields={[
          {
            key: "show-modal",
            label: "",
            _style: { maxWidth: "10px" },
            sorter: false,
            filter: false,
          },
          ...metadata.filter(function (m) {
            return !m.hide;
          }),
        ]}
        itemsPerPage={15}
        pagination
        scopedSlots={{
          "show-modal": (item, index) => {
            return (
              <td
                className="py-2"
                style={{
                  minWidth: 127,
                }}
              >
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    setSelectedData(item);
                    setModal(true);
                    onRead(item);
                    //toggleDetails(index)
                  }}
                >
                  <CIcon width={24} name="cil-pencil" />
                </CButton>
                {' '}
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={async () => {
                    await onDelete(item);
                    onRefreshTable()
                    //toggleDetails(index)
                  }}
                >
                  <CIcon width={24} name="cil-trash" />
                </CButton>
                {' '}
                {addOption(item)}
              </td>
            );
          },
        }}
      />
      <CModal
        show={modal}
        onClose={() => {
          setModal(false);
          setSelectedData(null);
          //setLarge(!large)
        }}
        closeOnBackdrop={false}
        key={reRender}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <Form
          onSubmit={onSubmit}
          initialValues={selectedData || {}}
          mutators={{
            ...arrayMutators,
          }}
          validate={validate}
          render={({
            handleSubmit,
            form: {
              mutators: { push, pop },
            },
          }) => (
            <>
              <form onSubmit={handleSubmit}>
                <CModalBody>
                  {metadata.map(function (metadataRow) {
                    return (
                      <Field name={metadataRow.key} key={metadataRow.key}>
                        {({ input, meta }) => (
                          <>
                            <CFormGroup>
                              <CLabel htmlFor={metadataRow.key}>
                                {metadataRow.label}
                              </CLabel>
                              {metadataRow.type === "signature" ? (
                                <ESignature
                                  svg={input.value}
                                  disableEdit={!!selectedData && metadataRow.disableEdit}
                                  onChange={input.onChange}
                                ></ESignature>
                              ) : null}
                              {metadataRow.type === "text" ? (
                                <CInput
                                  {...input}
                                  id={metadataRow.key}
                                  invalid={meta.invalid && meta.touched}
                                />
                              ) : null}
                              {metadataRow.type === "date" ? (
                                <CInput
                                  {...input}
                                  type="date"
                                  id={metadataRow.key}
                                  invalid={meta.invalid && meta.touched}
                                />
                              ) : null}
                              {metadataRow.type === "datetime" ? (
                                <CInput
                                  {...input}
                                  type="datetime-local"
                                  id={metadataRow.key}
                                  invalid={meta.invalid && meta.touched}
                                />
                              ) : null}

                              {metadataRow.type === "time" ? (
                                <CInput
                                  {...input}
                                  type="time"
                                  id={metadataRow.key}
                                  invalid={meta.invalid && meta.touched}
                                />
                              ) : null}
                              {metadataRow.type === "textarea" ? (
                                <CTextarea
                                  {...input}
                                  type="time"
                                  id={metadataRow.key}
                                  rows="9"
                                  invalid={meta.invalid && meta.touched}
                                />
                              ) : null}
                              {metadataRow.type === "array" ? (
                                <>
                                  <FieldArray name={metadataRow.key}>
                                    {({ fields: items }) => (
                                      <div>
                                        <CDataTable
                                          items={items.value}
                                          fields={[
                                            ...metadataRow.shape.filter(
                                              function (m) {
                                                return !m.hide;
                                              }
                                            ),
                                          ]}
                                          striped
                                          scopedSlots={metadataRow.shape.reduce(
                                            function (prev, curr) {
                                              prev[curr.key] = (
                                                item,
                                                index
                                              ) => {
                                                return (
                                                  <Field
                                                    name={`${metadataRow.key}.${index}.${curr.key}`}
                                                  >
                                                    {({
                                                      input: inputArray,
                                                      meta,
                                                    }) => (
                                                      <>
                                                        <td
                                                          className="py-2"
                                                          style={{
                                                            minWidth: 120,
                                                          }}
                                                        >
                                                          <CFormGroup>
                                                            {curr.type ===
                                                              "idNumeric" &&
                                                              index + 1}
                                                            {curr.type ===
                                                            "text" ? (
                                                              <CInput
                                                                {...inputArray}
                                                                id={
                                                                  metadataRow.key
                                                                }
                                                                invalid={
                                                                  meta.invalid &&
                                                                  meta.touched
                                                                }
                                                              />
                                                            ) : null}
                                                          </CFormGroup>
                                                        </td>
                                                      </>
                                                    )}
                                                  </Field>
                                                );
                                              };
                                              return prev;
                                            },
                                            {}
                                          )}
                                        />
                                        <CButton
                                          block
                                          color="dark"
                                          type="button"
                                          onClick={() => {
                                            push(metadataRow.key, {});
                                          }}
                                        >
                                          <CIcon size="lg" name="cil-plus" />{" "}
                                          Add Row
                                        </CButton>
                                      </div>
                                    )}
                                  </FieldArray>
                                  {/* <CButton
                                    block
                                    color="dark"
                                    type="button"
                                    onClick={() => {
                                      const rowsT = [...rows];
                                      rowsT.push({});
                                      setRow(rowsT);
                                    }}
                                  >
                                    <CIcon size="lg" name="cil-plus" /> Add Row
                                  </CButton> */}
                                </>
                              ) : null}
                              {metadataRow.type === "radius" ? (
                                <>
                                  {metadataRow.options?.map(function (option) {
                                    return (
                                      <Field
                                        name={metadataRow.key}
                                        type="radio"
                                        value={option.value}
                                      >
                                        {({
                                          input: inputOption,
                                          meta,
                                          values,
                                        }) => (
                                          <>
                                            <CFormGroup variant="checkbox">
                                              <CInputRadio
                                                className="form-check-input"
                                                id={option.value}
                                                value={option.value}
                                                name={inputOption.name}
                                                checked={
                                                  inputOption.checked ||
                                                  (option.otherOption &&
                                                    !metadataRow.options.find(
                                                      (option) => {
                                                        return (
                                                          option.value ===
                                                          input.value
                                                        );
                                                      }
                                                    ))
                                                }
                                                onChange={inputOption.onChange}
                                              />
                                              <CLabel
                                                variant="checkbox"
                                                htmlFor={option.value}
                                              >
                                                {option.label}
                                              </CLabel>
                                              {option.otherOption &&
                                                !metadataRow.options.find(
                                                  (option) => {
                                                    return (
                                                      option.value ===
                                                        input.value &&
                                                      !option.otherOption
                                                    );
                                                  }
                                                ) && (
                                                  <div>
                                                    <CInput
                                                      {...input}
                                                      id={metadataRow.key}
                                                      invalid={
                                                        meta.invalid &&
                                                        meta.touched
                                                      }
                                                    />
                                                  </div>
                                                )}
                                            </CFormGroup>
                                          </>
                                        )}
                                      </Field>
                                    );
                                  })}
                                </>
                              ) : null}

                              {meta.touched && meta.error && (
                                <CInvalidFeedback className="help-block">
                                  Please provide a valid information
                                </CInvalidFeedback>
                              )}
                            </CFormGroup>
                          </>
                        )}
                      </Field>
                    );
                  })}
                </CModalBody>
                <CModalFooter>
                  <CButton color="primary" type="submit">
                    {selectedData === null ? "Create" : "Update"}
                  </CButton>{" "}
                  {!!selectedData && (
                    <>
                      <CButton
                        color="danger"
                        onClick={() => {
                          onDelete(selectedData);
                          setModal(false);
                        }}
                      >
                        Delete
                      </CButton>{" "}
                    </>
                  )}
                  <CButton
                    color="secondary"
                    onClick={() => {
                      setModal(false);
                      setSelectedData(null);
                    }}
                  >
                    Cancel
                  </CButton>
                </CModalFooter>
              </form>
            </>
          )}
        />
      </CModal>
    </>
  );
};

export default React.memo(CrudTable);
