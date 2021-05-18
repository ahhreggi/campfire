import PropTypes from "prop-types";
import star from "../images/icons/star.png";
import starEmpty from "../images/icons/star-empty.png";

const Bookmark = (props) => {

  Bookmark.propTypes = {
    bookmarked: PropTypes.bool,
    styles: PropTypes.string
  };

  return (
    <div className={`Bookmark ${props.styles}`}>
      {props.bookmarked && <img src={star} alt="Bookmark" />}
      {!props.bookmarked && <img src={starEmpty} alt="Bookmark" />}
    </div>
  );
};

export default Bookmark;
