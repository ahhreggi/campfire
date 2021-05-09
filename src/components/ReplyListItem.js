import "./ReplyListItem.scss";
import PropTypes from "prop-types";

const ReplyListItem = (props) => {
  ReplyListItem.propTypes = {
    id: PropTypes.number,
    anonymous: PropTypes.bool,
    author: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string,
    lastModified: PropTypes.string,
    editable: PropTypes.bool,
    endorsed: PropTypes.bool
  };
  return (
    <div className="ReplyListItem">
      This is ReplyListItem.
    </div>
  );
};

export default ReplyListItem;
