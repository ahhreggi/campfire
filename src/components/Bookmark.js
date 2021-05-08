import "./Bookmark.scss";
import star from "../images/star.png";
import starEmpty from "../images/star-empty.png";
import PropTypes from "prop-types";

const Bookmark = ({bookmarked}) => {
  return (
    <>
      {bookmarked && <img src={star} alt="Bookmark" />}
      {!bookmarked && <img src={starEmpty} alt="Bookmark" />}
    </>
  );
};

Bookmark.propTypes = {
  bookmarked: PropTypes.bool
};

export default Bookmark;
