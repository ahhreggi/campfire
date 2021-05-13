import { useState, useEffect, useRef } from "react";
import usePrevious from "../../hooks/usePrevious";
import PropTypes from "prop-types";
import classNames from "classnames";
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

  EditForm.defaultProps = {
    minHeight: "10rem"
  };

  const [state, setState] = useState({
    previewTitle: props.title,
    previewBody: props.body,
    previewAuthor: props.author,
    previewAnonymous: props.anonymous,
    previewTags: props.tags,
    breakBody: false,
    selectionStart: null,
  });

  // Setup reference to text area to facilitate tab support
  const textArea = useRef(null);
  // Store a reference to the previous body to check when a new tab is inserted
  const prevBody = usePrevious(state.previewBody);

  // Update previewAuthor when toggling previewAnonymous
  useEffect(() => {
    setState({
      ...state,
      previewAuthor: getAuthorName(props.author, state.previewAnonymous)
    });
  }, [state.previewAnonymous]);

  useEffect(() => {
    // Update breakBody when updating previewTitle or previewBody
    const checkTitle = getLongestWordLength(state.previewTitle) > 30;
    const checkBody = getLongestWordLength(state.previewBody) > 30;
    setState({ ...state, breakBody: checkTitle || checkBody });

    // If a tab was inserted, update cursor location
    if (
      prevBody &&
      state.previewBody.match(/[\t]/g)?.length > prevBody.match(/[\t]/g)?.length
    ) {
      textArea.current.selectionStart = textArea.current.selectionEnd =
        state.selectionStart + 1;
    }
  }, [state.previewBody]);

  // SERVER-REQUESTING FUNCTIONS ////////////////////////////////////

  // Save changes to the post or comment
  const saveEdit = () => {
    const data = {
      title: props.mode === "POST" ? state.previewTitle : null,
      body: state.previewBody,
      anonymous: state.previewAnonymous,
      tags: props.mode === "POST" ? state.previewTags.map(tag => tag.id) : null
    };
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
      setState({ ...state, previewTags: [...state.previewTags, tag] });
    }
  };

  // When tab is pressed, keep textarea in focus and insert a tab into the body
  const insertTab = (event) => {
    // 'event.keyCode' will return the key code as a number: Tab = '9'
    if (event.keyCode === 9) {
      // Prevent the default action to not lose focus when tab
      event.preventDefault();

      // Get the cursor position
      const { selectionStart, selectionEnd } = event.target;
      // update the state
      setState((prev) => ({
        ...prev,
        previewBody:
          prev.previewBody.substring(0, selectionStart) +
          "\t" +
          prev.previewBody.substring(selectionEnd),
        selectionStart: selectionStart,
      }));
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
        label={props.label}
        title={state.previewTitle}
        author={state.previewAuthor}
        isInstructor={props.isInstructor}
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
        minHeight={props.minHeight}
        onChange={updatePreviewBody}
        onKeyDown={insertTab}
        refs={textArea}
      />

      {!props.isInstructor &&
        <Checkbox
          checked={state.previewAnonymous}
          onChange={updatePreviewAnonymous}
        />
      }

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
        onCancel={props.onCancel ? cancelEdit : null}
        useSubmit={props.label && !props.label.includes("EDIT")}
      />

    </div>
  );
};

export default EditForm;
