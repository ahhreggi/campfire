import React from 'react'
import { useState, useEffect } from "react";
import "./EditForm.scss";
import PostForm from "./PostForm";
import Button from "./Button";
import upvote from "../images/icons/heart.png";
import endorse from "../images/icons/endorse.png";
import plus from "../images/icons/plus.png";
import minus from "../images/icons/minus.png";
import edit from "../images/icons/edit.png";
import trash from "../images/icons/trash.png";
import checkmark from "../images/icons/checkmark.png";
import PropTypes from "prop-types";
import moment from "moment";

const EditForm = () => {
  return (
    <div className="EditForm">

      {/* Preview */}
      <section className="preview">

        <div className="label">
        PREVIEW
        </div>

        {/* Preview Title */}
        <div className="preview-header">
          <div>
            {state.previewTitle}
          </div>
        </div>

        {/* Preview Author  */}
        <div className="post-subheader">
          <div>
          Posting as <span className="author">{state.previewAuthor}</span>
          </div>
        </div>

        {/* Preview Body */}
        <div className={`post-body ${state.breakBody && "break"}`}>
          {state.previewBody}
        </div>

      </section>


      {/* Text Input Fields */}
      <section className="text-fields">

      <hr />

        {/* Title */}
        <PostForm
          label="Post Title"
          text={state.previewTitle}
          onChange={updatePreviewTitle}
          styles="form-title"
        />

        {/* Body */}
        <PostForm
          label="Post Body"
          text={state.previewBody}
          onChange={updatePreviewBody}
          styles="form-body"
        />

        {/* Anonymous Checkbox */}
        <div className="anon-form">
          Post as anonymous?
          <input
            className="form-check-input"
            type="checkbox"
            checked={state.previewAnonymous}
            onChange={updatePreviewAnonymous}
          />
          <span className="note">
            {state.previewAnonymous && " you will still be visible to instructors"}
          </span>
        </div>

        {/* Course Tags */}
        <div className="post-form-tags">
          <div className="label">
            Select up to <span className={`tag-counter ${limitReached && "limit"}`}> {tagLimit - state.previewTags.length}</span> tag(s):
          </div>
          <TagList
            tags={props.courseTags}
            selectedTags={state.previewTags}
            selectLimit={tagLimit}
            onClick={updatePreviewTags}
          />
        </div>

      </section>



    </div>
  )
}

export default EditForm
