import PropTypes from "prop-types";
import checkmark from "../images/icons/checkmark.png";

import "./Summary.scss";

const Summary = (props) => {

  Summary.propTypes = {
    resolved: PropTypes.number,
    unresolved: PropTypes.number,
    unread: PropTypes.number,
    onRedirect: PropTypes.func
  };

  return (
    <div className="Summary">
      {props.unresolved === 0 &&
        <div className="resolved-posts">
          <img src={checkmark} />
          All questions have been answered!
        </div>
      }
      {props.unread > 0 &&
        <div className="unread-posts">
          You have <span className="unread">{props.unread}</span> unread questions.
        </div>
      }
      {props.unresolved > 0 &&
        <div className="unresolved-posts">
          There are currently <span className="unresolved">{props.unresolved}</span> unresolved questions.
        </div>
      }
    </div>
  );
};

export default Summary;