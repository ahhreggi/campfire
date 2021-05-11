import TextareaAutosize from "react-autosize-textarea";
import PropTypes from "prop-types";

const Textarea = (props) => {

  PostForm.propTypes = {
    label: PropTypes.string,
    text: PropTypes.string,
    onChange: PropTypes.func,
  };

  return (
    <div className="Textarea">

      <div className="label">
        {props.label}
      </div>
      <TextareaAutosize
        style={{ height: "100%" }}
        value={props.text}
        onChange={(event) => props.onChange(event)}
      />

    </div>
  );
};

export default Textarea;
