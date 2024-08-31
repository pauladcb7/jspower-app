import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";

const ConfirmationContext = createContext({
  openConfirmation: null,
});

export const useConfirmation = function () {
  return useContext(ConfirmationContext);
};

export function ConfirmationRoot({ children }) {
  const [modal, setModal] = useState(false);
  const [options, setOptions] = useState();
  const promiseResRef = useRef();
  const promiseRejRef = useRef();

  const openConfirmation = useCallback((opts) => {
    const promise = new Promise((resolve, reject) => {
      setModal(true);
      setOptions(opts);
      promiseResRef.current = resolve;
      promiseRejRef.current = reject;
    });
    return promise;
  }, []);

  const close = () => {
    setModal(false);
    promiseResRef?.current?.(false);
  };
  const confirm = () => {
    setModal(false);
    promiseResRef?.current?.(true);
  };
  return (
    <ConfirmationContext.Provider
      value={{
        openConfirmation,
      }}
    >
      {children}
      <CModal show={modal} onClose={close}>
        <CModalHeader closeButton>{options?.title}</CModalHeader>
        <CModalBody>{options?.message}</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={confirm}>
            Confirm
          </CButton>
          <CButton color="secondary" onClick={close}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </ConfirmationContext.Provider>
  );
}
