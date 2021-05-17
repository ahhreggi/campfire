import PropTypes from "prop-types";

const InputField = (props) => {

  InputField.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func
  };

  return (
    <div className="InputField">
      <input
        value={props.value}
        placeholder={props.placeholder}
        type={props.type}
        onChange={(event) => props.onChange(event)}
      />
    </div>
  );
};

export default InputField;
