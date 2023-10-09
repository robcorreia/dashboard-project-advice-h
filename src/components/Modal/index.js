import Modal from "react-bootstrap/Modal";

function Example({ title, handleClose, show, children }) {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        {children}
      </Modal>
    </div>
  );
}

export default Example;
