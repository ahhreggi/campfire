import PropTypes from "prop-types";

// Temporary props data display for dev testing
// Usage: <DevData name="ComponentName" data={props} />
// props can also just be any object
const DevData = (props) => {
  DevData.propTypes = {
    name: PropTypes.string, // name of the component
    props: PropTypes.object, // the entire "props" object of that component
    label: PropTypes.string // a label to use instead of "props" (optional)
  };
  DevData.defaultProps = {
    label: "Props"
  };
  return (
    <div className="DevData">
      {props.label} data for <span>{props.name}</span>:
      <textarea value={JSON.stringify(props.props, null, 4)} readOnly />
    </div>
  );
};

export default DevData;
