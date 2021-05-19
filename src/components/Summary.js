import PropTypes from "prop-types";
import checkmark from "../images/icons/checkmark.png";
import help from "../images/icons/question-mark-blue.png";
import moment from "moment";

import "./Summary.scss";

const Summary = (props) => {

  Summary.propTypes = {
    users: PropTypes.number,
    timestamp: PropTypes.string,
    resolved: PropTypes.number,
    unresolved: PropTypes.number,
    unread: PropTypes.number,
    onRedirect: PropTypes.func
  };

  const total = props.resolved + props.unresolved;

  // Check if the course is new (created within 5 seconds)
  const newCourse = moment().diff(moment(props.timestamp)) < 5000;
  console.log(newCourse);
  const noUsers = props.users < 2;

  return (
    <div className="Summary">

      {(total === 0 || newCourse || noUsers) &&

        <div className="empty">
          There&apos;s nothing here yet.
          <div>If you need help getting started, check out the <span className="link faq" onClick={() => props.onRedirect("Help")}><img src={help} />FAQ</span>.</div>
        </div>

      }



      {total > 0 &&
        <>
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
              {props.unresolved === 1 &&
                <>There is currently <span className="unresolved">{props.unresolved}</span> unresolved question.</>
              }
              {props.unresolved > 1 &&
                <>There are currently <span className="unresolved">{props.unresolved}</span> unresolved questions.</>
              }
            </div>
          }
        </>
      }


    </div>
  );
};

export default Summary;