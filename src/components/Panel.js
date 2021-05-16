import PropTypes from "prop-types";
import "./Panel.scss";

const Panel = (props) => {
  Panel.propTypes = {
    label: PropTypes.string,
    img: PropTypes.string,
    onClick: PropTypes.func
  };
  Panel.defaultProps = {
    img: "./images/campfire.png"
  };
  return (
    <div className="Panel" onClick={props.onClick}>
      <div className="icon">
        <img src={props.img} />
      </div>
      <div className="label">
        {props.label}
      </div>
    </div>
  );
};

export default Panel;
