import { useState, useEffect } from "react";
import "./TagList.scss";
import Button from "./Button";
import PropTypes from "prop-types";

const TagList = (props) => {

  TagList.propTypes = {
    tags: PropTypes.array,
    selectedTags: PropTypes.array,
    onClick: PropTypes.func,
    truncate: PropTypes.number,
    styles: PropTypes.string,
    disabled: PropTypes.bool
  };

  TagList.defaultProps = {
    truncate: 0
  };

  const [disabled, setDisabled] = useState(props.selectedTags.length >= 5);

  useEffect(() => {
    setDisabled(props.selectedTags.length >= 5);
  }, [props.selectedTags]);

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  // Return true if the given tagID is in tags
  // TODO: Move to helper file (also in Post)
  const hasTag = (tags, tagID) => {
    return tags.filter(tag => tag.id === tagID).length;
  };

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  const handleClick = (tag) => {
    if (!disabled || hasTag(props.selectedTags, tag.id)) {
      props.onClick(tag);
    }
  };

  // VARIABLES //////////////////////////////////////////////////////

  let tags = props.tags;

  // Truncate tag list if a length limit is provided
  if (props.truncate) {
    tags = tags.slice(0, props.truncate);
  }

  // Calculate number of removed elements
  let removed;
  if (props.truncate && props.truncate < props.tags.length) {
    removed = props.tags.length - props.truncate;
  }

  tags = tags.map(tag => {
    return (
      <Button
        key={tag.id}
        text={tag.name}
        styles={`tag ${props.styles} ${hasTag(props.selectedTags, tag.id) ? "selected" : "unselected"} ${disabled && "disabled"}`}
        onClick={() => handleClick(tag)}
        disabled={props.disabled}
      />
    );
  });

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="TagList">
      <div>
        {tags}
      </div>
      {removed ? <span>+{removed}</span> : ""}
    </div>
  );

};

export default TagList;
