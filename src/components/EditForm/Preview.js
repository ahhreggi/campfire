import "./Preview.scss";
import PropTypes from "prop-types";


const Preview = (props) => {

  Preview.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string
  };

  // TODO: Break body if it contains words with 30+ chars

  return (
    <div className="Preview">

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
