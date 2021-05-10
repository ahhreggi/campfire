import Button from "./Button";
import PropTypes from "prop-types";

const TagList = (props) => {

  TagList.propTypes = {
    tags: PropTypes.array,
    selectedTags: PropTypes.array,
    onClick: PropTypes.func
  };

  // Return true if the given tagID is in tags
  const hasTag = (tags, tagID) => {
    return tags.filter(tag => tag.id === tagID).length;
  };

  console.log(props.tags.length);

  const tags = props.tags.map(tag => {
    return (
      <Button
        key={tag.id}
        text={tag.name}
        styles={`tag ${hasTag(props.selectedTags, tag.id) ? "selected" : "unselected"}`}
        onClick={() => props.onClick(tag)}
      />
    );
  });

  return <div>{tags}</div>;

};

export default TagList;
