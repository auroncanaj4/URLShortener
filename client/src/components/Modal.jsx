import "../assets/styles/modal-wrapper.css";
import PropTypes from "prop-types";

const Modal = ({ children, onCloseModal }) => {
  return (
    <section className="overlay">
      <div className="modalWrapper">
        <button className="closeModal" onClick={onCloseModal}>
          X
        </button>
        {children}
      </div>
    </section>
  );
};

Modal.propTypes = {
  children: PropTypes.elementType,
  onCloseModal: PropTypes.func,
};
export default Modal;
