import Button from "../Button";
import PropTypes from "prop-types";

const Confirmation = (props) => {

  Confirmation.propTypes = {
    message: PropTypes.string,
    onConfirm: PropTypes.func,
    onConfirmText: PropTypes.string,
    onConfirmStyles: PropTypes.string,
    onCancel: PropTypes.func,
    onCancelText: PropTypes.string,
    onCancelStyles: PropTypes.string
  };

  return (
    <div className="Confirmation">

      {props.message &&
        <div className="message">
          {props.message}
        </div>
      }

      <div className="buttons">

        <Button
          text={props.onConfirmText}
          styles={props.onConfirmStyles}
          onClick={props.onConfirm}
        />

        <Button
          text={props.onCancelText}
          styles={props.onCancelStyles}
          onClick={props.onCancel}
        />

      </div>

    </div>
  )
}

export default Confirmation
