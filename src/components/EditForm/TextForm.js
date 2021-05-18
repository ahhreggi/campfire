import PropTypes from "prop-types";
import TextareaAutosize from "react-autosize-textarea";
import "./TextForm.scss";

const TextForm = (props) => {

  TextForm.propTypes = {
    label: PropTypes.string,
    text: PropTypes.string,
    minHeight: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    refs: PropTypes.object,
    placeholder: PropTypes.string
  };

  return (
    <div className="TextForm">

      {props.label &&
        <div className="label">
          {props.label}
        </div>
      }

      <TextareaAutosize
        style={{ "minHeight": props.minHeight || "0rem" }}
        value={props.text}
        onChange={(event) => props.onChange(event)}
        onKeyDown={props.onKeyDown}
        ref={props.refs}
        placeholder={props.placeholder}
        spellCheck={"false"}
      />

    </div>
  );
};

export default TextForm;
