import "./Button.scss";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Button = ({type, text, disabled, onClick }) => {

  Button.propTypes = {
    type: PropTypes.string,
    id: PropTypes.number,
    text: PropTypes.string,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    onClick: PropTypes.func
  };

  return (
    <button
      disabled={disabled}
      className={`${type} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
