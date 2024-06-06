import React, { useContext } from "react";
import Modal from "react-modal";
import { ModalContext } from "./ModalContext";
import "./modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const CustomModal = ({ children, showModal }) => {
  const { setShowModal } = useContext(ModalContext);

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      contentLabel="Example Modal"
      closeTimeoutMS={300}
      className={{
        base: "modal-content",
        afterOpen: "after-open",
        beforeClose: "before-close"
      }}
      overlayClassName={{
        base: "modal-overlay",
        afterOpen: "after-open",
        beforeClose: "before-close"
      }}
    >
      <button className="closeModal" onClick={() => setShowModal(false)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>

      {children}
    </Modal>
  );
};

export default CustomModal;
