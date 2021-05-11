import Button from "../Button";
import PropTypes from "prop-types";

const Confirmation = (props) => {

  Confirmation.propTypes = {
    message: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func
  };

  const confirmText = props.message !== null ? "SAVE" : "DELETE";
  const confirmStyles = props.message !== null ? "green" : "red";
  const cancelStyles = props.message !== null ? "red" : "white";

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
          styles={confirmStyles}
          onClick={props.onConfirm}
        />

        <Button
          text={"CANCEL"}
          styles={cancelStyles}
          onClick={props.onCancel}
        />

      </div>

    </div>
  );
};

export default Confirmation;
