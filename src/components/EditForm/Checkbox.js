import PropTypes from "prop-types";

const Checkbox = (props) => {

  Checkbox.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func
  };

  return (
    <div className="Checkbox">

      <span className="label">
        Post as anonymous?
      </span>

      <input
        className="form-check-input"
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
      />

      <span className="note">
        {props.checked && " you will still be visible to instructors"}
      </span>

    </div>
  );
};

export default Checkbox;
