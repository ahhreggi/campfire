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

  // If the button is a resolved/unresolved tag, add special styles
  let styles = props.styles;
  if (props.id === -1) {
    styles += " resolved";
  } else if (props.id === -2) {
    styles += " unresolved";
  }

  return (
    <button
      className={`${styles}`}
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
