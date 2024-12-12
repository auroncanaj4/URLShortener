import "../assets/styles/alert.css";
import classNames from "classnames";
import PropTypes from "prop-types";
const Alert = ({ alertContent }) => {
  return (
    <div
      className={classNames("alert", {
        close: !alertContent.showMessage,
      })}
    >
      <div className="text">
        <p>{alertContent.message}</p>
      </div>
    </div>
  );
};

Alert.propTypes = {
  alertContent: PropTypes.shape({
    showMessage: PropTypes.bool,
    message: PropTypes.string,
  }),
};

export default Alert;
