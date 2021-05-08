import "./Button.scss";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Button = ({type, text, disabled}) => {
  return (
    <button disabled={disabled} className={`btn-${type} ${disabled ? "disabled" : ""}`}>
      {text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  id: PropTypes.number,
  text: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;
