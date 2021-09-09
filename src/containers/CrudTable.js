import React, { useState } from "react";
import {  CButton, CDataTable, CFooter, CFormGroup, CInput, CInvalidFeedback, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTextarea } from "@coreui/react";
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
  onEdit = () => {},
  onDelete = () => {},
  onCreate = () => {},
  onRead = () => {},
  onRefreshTable
}) => {
  const [modal, setModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  function onSubmit (newData) {
    if(selectedData) {
      onEdit(selectedData,newData)
    } else {
      onCreate(newData)
    }
  }
  function validate () {

  }
  return (
    <>
      
      <CButton
        block
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
        items={rows}
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
                    <CIcon width={24} name="cil-pencil"/>
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
          //setLarge(!large)
        }}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Form
            onSubmit={onSubmit}
            initialValues={selectedData}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {metadata.map(function(metadataRow) {
                  return <Field name={metadataRow.key} key={metadataRow.key}>
                    {({ input, meta }) => (
                      <>
                        <CFormGroup>
                          <CLabel htmlFor={metadataRow.key}>{metadataRow.label}</CLabel>
                          {
                            metadataRow.type === 'signature' ?
                            <ESignature svg={input.value}></ESignature>
                            :null
                          }
                          {
                            metadataRow.type === 'text' ?
                            <CInput
                              {...input}
                              id={metadataRow.key}
                              invalid={meta.invalid && meta.touched}
                            />
                            :null
                          }
                          {
                            metadataRow.type === 'date' ?
                            <CInput
                              {...input}
                              type='date'
                              id={metadataRow.key}
                              invalid={meta.invalid && meta.touched}
                            />
                            :null
                          }
                          {
                            metadataRow.type === 'time' ?
                            <CInput
                              {...input}
                              type='time'
                              id={metadataRow.key}
                              invalid={meta.invalid && meta.touched}
                            />
                            :null
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
                            :null
                          }
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
                
              </form>
            )}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => {
            //setLarge(!large)
          }}>{selectedData === null ? 'Create': 'Update'}</CButton>{' '}
          {
            !!selectedData && 
            <>
            <CButton color="danger" onClick={() => {
              onDelete(selectedData)
            }}>Delete</CButton>{' '}
            </>
          }
          <CButton color="secondary" onClick={() => {
            setModal(false)
          }}>Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default React.memo(CrudTable);
