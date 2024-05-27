import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, onHide, onConfirm, message }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Proceed
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
