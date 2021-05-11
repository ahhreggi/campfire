import Button from "../Button";
import PropTypes from "prop-types";

const Confirmation = (props) => {

  Confirmation.propTypes = {
    message: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func
  };

  return (
    <div className="Confirmation">

      <div className="message">
        {props.message}
      </div>

      <div className="buttons">

        <Button
          text="Save"
          styles="form green"
          onClick={props.onConfirm}
        />

        <Button
          text="Cancel"
          styles="form red"
          onClick={props.onCancel}
        />

      </div>

    </div>
  )
}

export default Confirmation
