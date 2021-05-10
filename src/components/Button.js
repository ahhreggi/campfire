import "./Button.scss";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Button = (props) => {

  Button.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string,
    styles: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
  };

  return (
    <button
      className={`${props.styles}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default Button;
