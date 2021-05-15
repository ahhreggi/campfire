import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Preview from "./Preview";
import TextForm from "./TextForm";
import Checkbox from "./Checkbox";
import TagForm from "./TagForm";
import Confirmation from "../Confirmation";
import "./index.scss";

const EditForm = (props) => {

  EditForm.propTypes = {

    label: PropTypes.string,

    title: PropTypes.string,
    author: PropTypes.string,
    role: PropTypes.string,
    body: PropTypes.string,
    anonymous: PropTypes.bool,
    tags: PropTypes.array,
    courseTags: PropTypes.array,

    onSave: PropTypes.func,
    onCancel: PropTypes.func,

    mode: PropTypes.string, // "POST" or "COMMENT"

    isInstructor: PropTypes.bool,
    minHeight: PropTypes.string

  };

  const [state, setState] = useState({
    previewTitle: props.title ? props.title.trim() : "",
    previewBody: props.body ? props.body.trim() : "",
    previewAuthor: props.author ? props.author.trim() : "",
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
    let data;
    if (props.mode === "POST") {
      data = {
        title: state.previewTitle.trim() ? state.previewTitle.trim() : props.title, // title may not be non-empty
        body: state.previewBody.trim() ? state.previewBody.trim() : " ",
        anonymous: state.previewAnonymous,
        tags: state.previewTags.map(tag => tag.id)
      };
    } else {
      data = {
        body: state.previewBody.trim() ? state.previewBody : " ",
        anonymous: state.previewAnonymous
      };
    }
    props.onSave(data);
  };

  // Cancel edit
  const cancelEdit = () => {
    props.onCancel();
  };

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

  // Update the preview title dynamically as the user types
  const updatePreviewTitle = (event) => {
    setState({ ...state, previewTitle: event.target.value });
  };

  // Update the preview body dynamically as the user types
  const updatePreviewBody = (event) => {
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

      {/* Preview */}
      <Preview
        label={props.label}
        title={state.previewTitle}
        author={state.previewAuthor}
        isInstructor={props.role !== "student"}
        body={state.previewBody}
        breakBody={state.breakBody}
      />

      {/* Title Field */}
      {props.mode === "POST" &&
        <TextForm
          label={"Post Title"}
          text={state.previewTitle}
          onChange={updatePreviewTitle}
          minHeight={"0"}
        />
      }

      {/* Body Field */}
      <TextForm
        label={props.mode === "POST" ? "Post Body" : ""} // no label if it's a comment body
        text={state.previewBody}
        minHeight={props.minHeight ? props.minHeight : "10rem"}
        onChange={updatePreviewBody}
      />

      {/* Anonymous Checkbox */}
      {props.role === "student" &&
        <Checkbox
          checked={state.previewAnonymous}
          onChange={updatePreviewAnonymous}
        />
      }

      {/* Tag Form */}
      {props.mode === "POST" &&
        <TagForm
          tags={props.courseTags}
          selectedTags={state.previewTags}
          selectLimit={4}
          onClick={updatePreviewTags}
        />
      }

      <hr />

      {/* Save/Cancel Buttons */}
      <Confirmation
        onConfirm={saveEdit}
        onCancel={props.onCancel ? cancelEdit : null}
        useSubmit={props.label && !props.label.includes("EDIT")}
      />

    </div>
  );
};

export default EditForm;
