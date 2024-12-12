import Modal from "./Modal";
import "../assets/styles/qrcode-modal.css";
import PropTypes from "prop-types";

const QrModal = ({ qrCodeValue, qrUrl, onCloseModal }) => {
  return (
    <Modal onCloseModal={onCloseModal}>
      <h3 className="qrModalTitle">QR Generated</h3>
      <a href={`http://localhost:8080/${qrUrl}`}>
        <img className="qrCode" src={qrCodeValue} alt="" />
      </a>
      <div className="qrInfo">
        <blockquote className="urlModal">{`http://localhost:8080/${qrUrl}`}</blockquote>
      </div>
    </Modal>
  );
};

QrModal.propTypes = {
  qrCodeValue: PropTypes.string,
  qrUrl: PropTypes.string,
  onCloseModal: PropTypes.func,
};

export default QrModal;
