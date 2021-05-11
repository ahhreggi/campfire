import PropTypes from "prop-types";
import "./Button.scss";
// import { Link } from "react-router-dom";

const Button = (props) => {

  Button.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string,
    styles: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    image: PropTypes.string
  };

  return (
    <button
      className={`${props.styles}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.image &&
        <img src={props.image} />
      }
      {props.text}
    </button>
  );
};

export default Button;
