import { useState, useEffect } from "react";
import "./TagList.scss";
import Button from "./Button";
import PropTypes from "prop-types";

const TagList = (props) => {

  TagList.propTypes = {
    tags: PropTypes.array,
    selectedTags: PropTypes.array,
    onClick: PropTypes.func,
    truncate: PropTypes.number
  };

  const [disabled, setDisabled] = useState(props.selectedTags.length >= 3);

  useEffect(() => {
    setDisabled(props.selectedTags.length >= 3);
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

  const tags = props.tags.map(tag => {
    return (
      <Button
        key={tag.id}
        text={tag.name}
        styles={`tag ${hasTag(props.selectedTags, tag.id) ? "selected" : "unselected"} ${disabled && "disabled"}`}
        onClick={() => handleClick(tag)}
      />
    );
  });

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="TagList">
      <div>
        {tags}
      </div>
      <span>+3</span>
    </div>
  );

};

export default TagList;
