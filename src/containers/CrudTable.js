import React, { useState } from "react";
import { CButton, CDataTable, CFooter, CFormGroup, CInput, CInputRadio, CInvalidFeedback, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTextarea } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Field, Form } from "react-final-form";
import SignaturePad from "signature_pad";
import ESignature from "src/components/SiganturePadPaula";

const CrudTable = ({
  rows = [
    {
      id: 1,
      name: 'eric',
      lastName: 'vargas'
    },
  ],
  metadata = [
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      sorter: false,
      filter: false,
    }
  ],
  title='',
  onEdit = () => { },
  onDelete = () => { },
  onCreate = () => { },
  onRead = () => { },
  onRefreshTable
}) => {
  const [modal, setModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  function onSubmit(newData) {
    if (selectedData) {
      onEdit(selectedData, newData)
    } else {
      onCreate(newData)
    }
    setModal(false)
  }
  function validate() {

  }
  return (
    <>

      <CButton
        playsInline
        color="dark"
        type="button"
        onClick={() => {
          setSelectedData(null)
          setModal(true)
        }}
      >
        <CIcon size="lg" name="cil-plus" /> Add Row
      </CButton>
      <CDataTable
        striped
        hover
        items={rows}
        tableFilter
        tablfi
        fields={[
          {
            key: 'show-modal',
            label: '',
            _style: { maxWidth: '10px' },
            sorter: false,
            filter: false
          },
          ...metadata.filter(function (m) {
            return !m.hide
          })
        ]}
        itemsPerPage={15}
        pagination
        scopedSlots={{
          'show-modal':
            (item, index) => {
              return (
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      setSelectedData(item)
                      setModal(true)
                      onRead(item)
                      //toggleDetails(index)
                    }}
                  >
                    <CIcon width={24} name="cil-pencil" />
                  </CButton>
                </td>
              )
            },
        }}
      />

      <CModal
        show={modal}
        onClose={() => {
          setModal(false)
          setSelectedData(null)
          //setLarge(!large)
        }}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <Form
          onSubmit={onSubmit}
          initialValues={selectedData || {}}
          validate={validate}
          render={({ handleSubmit }) => (
            <>
              <form onSubmit={handleSubmit}>
                <CModalBody>
                  {metadata.map(function (metadataRow) {
                    return <Field name={metadataRow.key} key={metadataRow.key}>
                      {({ input, meta }) => (
                        <>
                          <CFormGroup>
                            <CLabel htmlFor={metadataRow.key}>{metadataRow.label}</CLabel>
                            {
                              metadataRow.type === 'signature' ?
                                <ESignature 
                                  svg={input.value}
                                  onChange={input.onChange}
                                ></ESignature>
                                : null
                            }
                            {
                              metadataRow.type === 'text' ?
                                <CInput
                                  {...input}
                                  id={metadataRow.key}
                                  invalid={meta.invalid && meta.touched}
                                />
                                : null
                            }
                            {
                              metadataRow.type === 'date' ?
                                <CInput
                                  {...input}
                                  type='date'
                                  id={metadataRow.key}
                                  invalid={meta.invalid && meta.touched}
                                />
                                : null
                            }
                            {
                              metadataRow.type === 'time' ?
                                <CInput
                                  {...input}
                                  type='time'
                                  id={metadataRow.key}
                                  invalid={meta.invalid && meta.touched}
                                />
                                : null
                            }
                            {
                              metadataRow.type === 'textarea' ?
                                <CTextarea
                                  {...input}
                                  type='time'
                                  id={metadataRow.key}
                                  rows="9"
                                  invalid={meta.invalid && meta.touched}
                                />
                                : null
                            }
                            {
                              metadataRow.type === 'radius' ?
                                <>
                                  {
                                    metadataRow.options?.map(function (option) {
                                      return <Field name={metadataRow.key} type="radio" value={option.value}>
                                        {({ input:inputOption, meta, values }) => (
                                          <>
                                            <CFormGroup variant="checkbox">
                                              <CInputRadio
                                                className="form-check-input"
                                                id={option.value}
                                                value={option.value}
                                                name={inputOption.name}
                                                checked={inputOption.checked || (
                                                   option.otherOption && !metadataRow.options.find((option) => {
                                                    return option.value === input.value
                                                  })
                                                )}
                                                onChange={inputOption.onChange}
                                              />
                                              <CLabel variant="checkbox" htmlFor={option.value}>
                                                {option.label}
                                              </CLabel>
                                              {option.otherOption && !metadataRow.options.find((option) => {
                                                return option.value === input.value && !option.otherOption
                                              }) && <div >
                                                <CInput
                                                  {...input}
                                                  id={metadataRow.key}
                                                  invalid={meta.invalid && meta.touched}
                                                />
                                              </div>
                                              }
                                            </CFormGroup>
                                          </>
                                        )}
                                      </Field>
                                    })
                                  }

                                </>
                                : null
                            }

                            {/*  service-call
extra */}
                            {/* <CInput
                            {...input}
                            id={metadataRow.key}
                            invalid={meta.invalid && meta.touched}
                          /> */}
                            {meta.touched && meta.error && (
                              <CInvalidFeedback className="help-block">
                                Please provide a valid information
                              </CInvalidFeedback>
                            )}
                          </CFormGroup>
                        </>
                      )}
                    </Field>
                  })}
                </CModalBody>
                <CModalFooter>
                  <CButton color="primary" type="submit">{selectedData === null ? 'Create' : 'Update'}</CButton>{' '}
                  {
                    !!selectedData &&
                    <>
                      <CButton color="danger" onClick={() => {
                        onDelete(selectedData)
                        setModal(false)
                      }}>Delete</CButton>{' '}
                    </>
                  }
                  <CButton color="secondary" onClick={() => {
                    setModal(false)
                    setSelectedData(null)
                  }}>Cancel
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
