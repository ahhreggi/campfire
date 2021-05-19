import PropTypes from "prop-types";
import "./Avatars.scss";

const Avatars = (props) => {

  Avatars.propTypes = {
    selectedID: PropTypes.number,
    onClick: PropTypes.func
  };

  // Generate avatars
  const avatars = [...Array(22)].map((e, i) => {
    return (
      <div
        key={i}
        className={`img-box ${props.selectedID === i + 2 ? "active" : ""}`}
        onClick={() => props.onClick(i + 2)}
      >
        <img src={`./images/avatars/${i + 2}.png`} />
      </div>
    );
  });

  return (
    <div className="Avatars">{avatars}</div>
  );
};

export default Avatars;
