import PropTypes from "prop-types";

// Temporary props data display for dev testing
// Usage: <DevData name="ComponentName" data={props} />
const DevData = (props) => {
  DevData.propTypes = {
    name: PropTypes.string, // name of the component
    data: PropTypes.object // the entire "props" object of that component
  };
  return (
    <div className="DevData">
      Props data for <span>{props.name}</span>:
      <textarea value={JSON.stringify(props.data, null, 4)} readOnly />
    </div>
  );
};

export default DevData;
