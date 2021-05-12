import PropTypes from "prop-types";
import "./Preview.scss";

const Preview = (props) => {

  Preview.propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    breakBody: PropTypes.bool
  };

  Preview.defaultProps = {
    label: "PREVIEW"
  };

  return (
    <div className="Preview break">

      <div className="label">
        {props.label}
      </div>

      <div className="display">

        {props.author &&
          <div className="author">
            Posting as <span className="name">{props.author}</span>
          </div>
        }

        {props.title &&
          <div className="title">
            {props.title}
          </div>
        }

        {props.body &&
          <div className="body">
            {props.body}
          </div>
        }

      </div>

    </div>
  );
};

export default Preview;
