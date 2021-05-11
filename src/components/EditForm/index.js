import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Preview from "./Preview";
import TextForm from "./TextForm";
import Checkbox from "./Checkbox";
import TagForm from "./TagForm";
import Confirmation from "./Confirmation";

const EditForm = (props) => {

  EditForm.propTypes = {

    id: PropTypes.number,

    title: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    anonymous: PropTypes.string,
    tags: PropTypes.array,
    courseTags: PropTypes.string,

    onSave: PropTypes.func,
    onCancel: PropTypes.func,

    isPost: PropTypes.bool // true = includes labels for text areas, none otherwise

  };

  const [state, setState] = useState({
    id: props.id,
    showForm: false,
    showConfirmation: false,
    previewTitle: props.title,
    previewBody: props.body,
    previewAuthor: props.author,
    previewAnonymous: props.anonymous,
    previewTags: props.tags
  });

  // Reset form and confirmation states when switching posts
  useEffect(() => {
    setState({
      ...state,
      showForm: false,
      showConfirmation: false
    });
  }, [props.id]);

  // Reset preview states when toggling the post edit form
  useEffect(() => {
    setState({
      ...state,
      previewTitle: props.title,
      previewBody: props.body,
      previewAnonymous: props.anonymous,
      previewAuthor: getAuthorName(props.author, props.anonymous),
      previewTags: props.tags
    });
  }, [state.showForm]);

  // Update previewAuthor when toggling previewAnonymous
  useEffect(() => {
    setState({
      ...state,
      previewAuthor: getAuthorName(props.author, state.previewAnonymous)
    });
  }, [state.previewAnonymous]);

  // STATE-AFFECTING FUNCTIONS //////////////////////////////////////

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

  return (
    <div className="EditForm">

      <Preview
        title={props.title}
        author={props.author}
        body={props.body}
      />

      {isPost &&
        <TextForm
          label="Post Title"
          text={props.title}
          onChange={onChangePreviewTitle}
        />
      }

      <TextForm />

      <Checkbox />

      <TagForm />

      <Confirmation />

    </div>
  )
}

export default EditForm
