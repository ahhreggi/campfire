import PropTypes from "prop-types";
import arrow from "../images/icons/orange-arrow.png";
import "./BackButton.scss";

const BackButton = (props) => {
  BackButton.propTypes = {
    onRedirect: PropTypes.func
  };

  return (
    <div className="BackButton">
      <hr />
      <div className="link" onClick={() => props.onRedirect("Home")}>

        <img src={arrow} />
        <div>BACK TO HOME</div>
      </div>
    </div>
  );
};

export default BackButton;
