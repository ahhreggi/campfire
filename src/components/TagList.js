import { useState, useEffect } from "react";
import "./TagList.scss";
import Button from "./Button";
import PropTypes from "prop-types";

const TagList = (props) => {

  TagList.propTypes = {
    tags: PropTypes.array,
    selectedTags: PropTypes.array,
    selectLimit: PropTypes.number,
    onClick: PropTypes.func,
    truncate: PropTypes.number,
    styles: PropTypes.string,
    disabled: PropTypes.bool
  };

  TagList.defaultProps = {
    truncate: Infinity,
    selectLimit: Infinity
  };

  const [disabled, setDisabled] = useState(props.selectedTags.length >= props.selectLimit);

  useEffect(() => {
    setDisabled(props.selectedTags.length >= props.selectLimit);
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

  // Sort tags alphabetically
  tags.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  // Create button components
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
