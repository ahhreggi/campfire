import "./Post.scss";
import Button from "./Button";
import CommentList from "./CommentList";
import PropTypes from "prop-types";

// Receiving: props.post => contains all data for a specific post

const Post = (props) => {

  Post.propTypes = {
    id: PropTypes.number,
    anonymous: PropTypes.bool,
    author: PropTypes.string,
    bestAnswer: PropTypes.number,
    body: PropTypes.string,
    bookmarked: PropTypes.bool,
    comments: PropTypes.array,
    createdAt: PropTypes.string,
    lastModified: PropTypes.string,
    editable: PropTypes.bool,
    tags: PropTypes.array,
    title: PropTypes.string,
    userID: PropTypes.number,
    views: PropTypes.number,
    onEditComment: PropTypes.func
  };

  const editPost = () => {
    console.log("clicked EDIT post button");
  };

  const deletePost = () => {
    console.log("clicked DELETE post button");
  };

  const tags = props.tags.map(tag => {
    return (
      <Button
        key={tag.id}
        text={tag.name}
        styles="tag"
      />
    );
  });

  return (
    <div className="Post">
      {props.bestAnswer && <div>this question is RESOLVED</div>}
      {!props.bestAnswer && <div>this question is UNRESOLVED</div>}
      <div>
        id: {props.id}
      </div>
      <div>
        anonymous: {props.anonymous ? "true" : "false"}
      </div>
      <div>
        resolved? (best answer): {props.bestAnswer ? "id: " + props.bestAnswer : "none selected"}
      </div>
      <div>
        bookmarked: {props.bookmarked ? "true" : "false"}
      </div>
      <div>
        created at: {props.createdAt}
      </div>
      <div>
        last modified: {props.lastModified}
      </div>
      <div>
        editable: {props.editable ? "true" : "false"}
      </div>
      <div>
        title: {props.title}
      </div>
      <div>
        body: {props.body}
      </div>
      <div>
        tags:
        {tags}
      </div>
      <div>
        views: {props.views}
      </div>
      {props.editable && <Button type="edit" onClick={editPost} text="EDIT" />}
      {props.editable && <Button type="delete" onClick={deletePost} text="DELETE" />}
      <CommentList comments={props.comments} onEditComment={props.onEditComment} />
    </div>
  );
};

export default Post;
