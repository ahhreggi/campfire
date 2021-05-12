import PropTypes from "prop-types";
import "./Badge.scss";

const Badge = ({type}) => {

  Badge.propTypes = {
    type: PropTypes.string
  };

  return (
    <div className={`Badge badge-${type}`}>
    </div>
  );
};

export default Badge;
