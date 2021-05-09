import "./ReplyList.scss";
import ReplyListItem from "./ReplyListItem";
import PropTypes from "prop-types";

const ReplyList = (props) => {

  ReplyList.propTypes = {
    replies: PropTypes.array
  };

  const replies = props.replies.map(comment => {
    return (
      <ReplyListItem
        key={comment.id}
        id={comment.id}
        anonymous={comment.anonymous}
        author={`${comment.author_first_name} ${comment.author_last_name}`}
        body={comment.body}
        createdAt={comment.created_at}
        lastModified={comment.last_modified}
        editable={comment.editable}
        endorsements={comment.endorsements}
      />
    );
  });

  return (
    <div className="ReplyList">
      {replies}
    </div>
  );
};

export default ReplyList;
