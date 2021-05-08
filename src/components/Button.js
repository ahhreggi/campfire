import "./Button.scss";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Button = ({text, styles, onClick, disabled}) => {

  Button.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string,
    styles: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
  };

  return (
    <button
      disabled={disabled}
      className={`${styles} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
