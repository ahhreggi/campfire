import "./Badge.scss";
import PropTypes from "prop-types";

const Badge = ({type}) => {
  return (
    <div className={`Badge badge-${type}`}>
    </div>
  );
};

Badge.propTypes = {
  type: PropTypes.string
};

export default Badge;
