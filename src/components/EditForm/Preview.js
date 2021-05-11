import "./Preview.scss";
import PropTypes from "prop-types";


const Preview = (props) => {

  Preview.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    breakBody: PropTypes.bool
  };

  return (
    <div className="Preview break">

      <div className="label">
        PREVIEW
      </div>

      {props.title &&
        <div className="title">
          {props.title}
        </div>
      }

      {props.author &&
        <div className="author">
          Posting as <span className="name">{props.author}</span>
        </div>
      }

      {props.body &&
        <div className="body">
          {props.body}
        </div>
      }

    </div>
  );
};

export default Preview;
