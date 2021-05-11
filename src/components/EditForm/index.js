import { useState, useEffect } from "react";
import "./index.scss";
import PropTypes from "prop-types";

import Preview from "./Preview";
import TextForm from "./TextForm";
import Checkbox from "./Checkbox";
import TagForm from "./TagForm";
import Confirmation from "../Confirmation";

const EditForm = (props) => {

  EditForm.propTypes = {

    title: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    anonymous: PropTypes.bool,
    tags: PropTypes.array,
    courseTags: PropTypes.array,

    onSave: PropTypes.func,
    onCancel: PropTypes.func,

    mode: PropTypes.string // "POST" or "COMMENT"

  };

  const [state, setState] = useState({
    previewTitle: props.title,
    previewBody: props.body,
    previewAuthor: props.author,
    previewAnonymous: props.anonymous,
    previewTags: props.tags,
    breakBody: false
  });

  // Update previewAuthor when toggling previewAnonymous
  useEffect(() => {
    setState({
      ...state,
      previewAuthor: getAuthorName(props.author, state.previewAnonymous)
    });
  }, [state.previewAnonymous]);

  // Update breakBody when updating previewTitle or previewBody
  useEffect(() => {
    const checkTitle = getLongestWordLength(state.previewTitle) > 30;
    const checkBody = getLongestWordLength(state.previewBody) > 30;
    setState({ ...state, breakBody: checkTitle || checkBody });
  }, [state.previewBody]);

  // SERVER-REQUESTING FUNCTIONS ////////////////////////////////////

  // Save changes to the post or comment
  const saveEdit = () => {
    // Gather new post data to send to the server
    const data = {
      title: state.mode === "POST" ? state.previewTitle : null,
      body: state.previewBody,
      anonymous: state.previewAnonymous,
      tags: state.mode === "POST" ? state.previewTags.map(tag => tag.id) : null
    };
    props.onSave(data);
  };

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  // Update the preview title dynamically as the user types
  const updatePreviewTitle = (event) => {
    console.log(event.target.value);
    setState({ ...state, previewTitle: event.target.value });
  };

  // Update the preview body dynamically as the user types
  const updatePreviewBody = (event) => {
    console.log(event.target.value);
    setState({ ...state, previewBody: event.target.value });
  };

  // Update the preview author dynamically as the user toggles anonymous
  const updatePreviewAnonymous = (event) => {
    setState({ ...state, previewAnonymous: event.target.checked });
  };

  // Update the preview tags dynamically as the user toggles them
  const updatePreviewTags = (tag) => {
    const selected = hasTag(state.previewTags, tag.id);
    // If the tag is already selected, unselect it
    if (selected) {
      const updatedTags = state.previewTags.filter(pTag => pTag.id !== tag.id);
      setState({ ...state, previewTags: updatedTags });
      // Otherwise, select it
    } else {
      setState({ ...state, previewTags: [ ...state.previewTags, tag ] });
    }
  };

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  // Return the author name based on the given anonymous value (bool)
  // e.g. User is a student: "First Last" or "Anonymous"
  //      User is the author or an instructor: "First Last (Anonymous to students)"
  // TODO: Move to helper file (also in CommentListItem)
  const getAuthorName = (author, anonymous) => {
    // Set the displayed author name
    let name = anonymous ? "Anonymous" : author;
    if (anonymous && author) {
      name = author + " (Anonymous to students)";
    }
    return name;
  };

  // Return the length of the longest word in the given string
  const getLongestWordLength = (text) => {
    if (text) {
      return Math.max(...text.split(" ").map(word => word.length));
    }
  };

  // Return true if tags contains the given tag ID
  // TODO: Move to helper file (also in TagList)
  const hasTag = (tags, tagID) => {
    return tags.filter(tag => tag.id === tagID).length;
  };

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="EditForm">

      <Preview
        title={state.previewTitle}
        author={state.previewAuthor}
        body={state.previewBody}
        breakBody={state.breakBody}
      />

      {props.mode === "POST" &&
        <TextForm
          label={"Post Title"}
          text={state.previewTitle}
          onChange={updatePreviewTitle}
        />
      }

      <TextForm
        label={props.mode === "POST" ? "Post Body" : ""} // no label if it's a comment body
        text={state.previewBody}
        minHeight={"10rem"}
        onChange={updatePreviewBody}
      />

      <Checkbox
        checked={state.previewAnonymous}
        onChange={updatePreviewAnonymous}
      />

      {props.mode === "POST" &&
        <TagForm
          tags={props.courseTags}
          selectedTags={state.previewTags}
          selectLimit={4}
          onClick={updatePreviewTags}
        />
      }

      <hr />

      <Confirmation
        onConfirm={saveEdit}
        onCancel={() => props.onCancel()}
      />

    </div>
  );
};

export default EditForm;
