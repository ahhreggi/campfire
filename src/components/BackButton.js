import PropTypes from "prop-types";
import arrow from "../images/icons/orange-arrow.png";
import "./BackButton.scss";

const BackButton = (props) => {
  BackButton.propTypes = {
    label: PropTypes.string,
    destination: PropTypes.string,
    onRedirect: PropTypes.func
  };


  return (
    <div className="BackButton">
      <div className="link" onClick={() => props.onRedirect(props.destination)}>
        <img src={arrow} />
        <div>BACK TO {props.label}</div>
      </div>
    </div>
  );
};

export default BackButton;
