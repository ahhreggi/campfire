import PropTypes from "prop-types";
import Button from "./Button";
import "./Confirmation.scss";

const Confirmation = (props) => {

  Confirmation.propTypes = {
    message: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    useSubmit: PropTypes.bool,
    confirmText: PropTypes.string
  };

  let confirmText = props.message ? "DELETE" : props.useSubmit ? "SUBMIT" : "SAVE";
  if (props.message && props.message.includes("unenroll")) {
    confirmText = "UNENROLL";
  }
  if (props.confirmText) {
    confirmText = props.confirmText;
  }
  const confirmStyles = props.message ? "red" : "green";
  const cancelStyles = props.message ? "white" : "red";

  return (
    <div className="Confirmation">

      {props.message &&
        <div className="message">
          {props.message}
        </div>
      }

      <div className="buttons">

        <Button
          text={confirmText}
          styles={"form " + confirmStyles}
          onClick={props.onConfirm}
        />

        {props.onCancel &&
          <Button
            text={"CANCEL"}
            styles={"form " + cancelStyles}
            onClick={props.onCancel}
          />
        }

      </div>

    </div>
  );
};

export default Confirmation;
