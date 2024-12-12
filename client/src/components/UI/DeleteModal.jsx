import "../../assets/styles/delete-modal.css";
import Modal from "./Modal";
import PropTypes from "prop-types";

const DeleteModal = ({ onHandleDelete, onCancelDelete, url }) => {
  return (
    <Modal onCloseModal={onCancelDelete}>
      <div className="header">
        <h3 className="deleteQuestion">Are you sure you want to delete</h3>
        <a className="urlDelete" href={url}>{`${url} ?`}</a>
      </div>

      <div className="buttons">
        <button onClick={onHandleDelete} className="deleteButton">
          Delete
        </button>
        <button onClick={onCancelDelete} className="cancelButton">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

DeleteModal.propTypes = {
  onHandleDelete: PropTypes.func,
  onCancelDelete: PropTypes.func,
  url: PropTypes.string,
};

export default DeleteModal;
