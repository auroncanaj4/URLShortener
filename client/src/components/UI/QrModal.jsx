import Modal from "./Modal";
import "../../assets/styles/qrcode-modal.css";
import PropTypes from "prop-types";

const QrModal = ({ qrCodeValue, qrUrl, onCloseModal }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  return (
    <Modal onCloseModal={onCloseModal}>
      <h3 className="qrModalTitle">QR Generated</h3>
      <a href={`${API_BASE_URL}/${qrUrl}`}>
        <img className="qrCode" src={qrCodeValue} alt="" />
      </a>
      <div className="qrInfo">
        <blockquote className="urlModal">{`${API_BASE_URL}/${qrUrl}`}</blockquote>
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
