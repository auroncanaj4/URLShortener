import "../assets/styles/button.css";
import PropTypes from "prop-types";

const Button = ({ children, onButtonClick }) => {
  return (
    <button className="button" type="submit" onClick={onButtonClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.object,
  onButtonClick: PropTypes.func,
};

export default Button;
