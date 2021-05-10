import "./Button.scss";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Button = ({text, styles, onClick}) => {

  Button.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string,
    styles: PropTypes.string,
    onClick: PropTypes.func
  };

  return (
    <button
      className={`${styles}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
