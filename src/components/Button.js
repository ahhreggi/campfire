import "./Button.scss";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Button = ({type, text, disabled}) => {

  Button.propTypes = {
    type: PropTypes.string,
    id: PropTypes.number,
    text: PropTypes.string,
    disabled: PropTypes.bool,
    color: PropTypes.string
  };

  return (
    <button
      disabled={disabled}
      className={`${type} ${disabled ? "disabled" : ""}`}>
      {text}
    </button>
  );
};

export default Button;
