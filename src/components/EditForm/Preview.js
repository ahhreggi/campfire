import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Preview.scss";

const Preview = (props) => {

  Preview.propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    isInstructor: PropTypes.bool,
    body: PropTypes.string,
    breakBody: PropTypes.bool
  };

  Preview.defaultProps = {
    label: "PREVIEW"
  };

  const [breakBody, setBreakBody] = useState(props.breakBody);

  useEffect(() => {
    setBreakBody(props.breakBody);
  }, [props.breakBody]);

  const isPost = props.label.includes("POST");

  return (
    <div className={`Preview ${breakBody ? "break" : ""}`}>

      <div className="label">
        {props.label}
      </div>

      <div className="display">

        {props.author &&
          <div className="author">
            Posting as <span className={`name ${props.isInstructor ? "instructor" : ""}`}>{props.author}</span>
          </div>
        }

        {isPost &&
          <div className="title break">
            {props.title}
          </div>
        }

        <div className="body">
          {props.body}
        </div>

      </div>

    </div>
  );
};

export default Preview;
