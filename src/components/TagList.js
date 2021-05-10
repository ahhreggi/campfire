import { useState, useEffect } from "react";
import "./TagList.scss";
import Button from "./Button";
import PropTypes from "prop-types";

const TagList = (props) => {

  TagList.propTypes = {
    tags: PropTypes.array,
    selectedTags: PropTypes.array,
    onClick: PropTypes.func
  };

  const [disabled, setDisabled] = useState(props.selectedTags.length >= 3);

  useEffect(() => {
    setDisabled(props.selectedTags.length >= 3);
  }, [props.selectedTags]);

  // Return true if the given tagID is in tags
  // TODO: Move to helper file (also in Post)
  const hasTag = (tags, tagID) => {
    return tags.filter(tag => tag.id === tagID).length;
  };

  const handleClick = (tag) => {
    if (!disabled) {
      props.onClick(tag);
    } else if (disabled) {
      if (hasTag(props.selectedTags, tag.id)) {
        props.onClick(tag);
      } else {
        console.log("This button is unavailable.");
      }
    }
    console.log(props.selectedTags);
  };

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

  return <div className="TagList">{tags}</div>;

};

export default TagList;
