import "./TagForm.scss";
import TagList from "../TagList";
import PropTypes from "prop-types";

const TagForm = (props) => {

  TagForm.propTypes = {
    tags: PropTypes.array,
    selectedTags: PropTypes.array,
    selectLimit: PropTypes.number,
    onClick: PropTypes.func
  };

  const limitReached = props.selectedTags.length >= props.selectLimit;
  const remaining = props.selectLimit - props.selectedTags.length;

  return (
    <div className="TagForm">

      <div className="label">
        Select up to <span className={limitReached && "limit"}>{remaining}</span> tag(s):
      </div>

      <TagList
        tags={props.tags}
        selectedTags={props.selectedTags}
        selectLimit={props.selectLimit}
        onClick={props.onClick}
      />

    </div>
  );
};

export default TagForm;
