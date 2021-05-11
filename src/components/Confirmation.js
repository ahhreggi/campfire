import "./Confirmation.scss";
import Button from "./Button";
import PropTypes from "prop-types";

const Confirmation = (props) => {

  Confirmation.propTypes = {
    message: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func
  };

  const confirmText = props.message ? "DELETE" : "SAVE";
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

        <Button
          text={"CANCEL"}
          styles={"form " + cancelStyles}
          onClick={props.onCancel}
        />

      </div>

    </div>
  );
};

export default Confirmation;
