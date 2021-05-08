import "./Bookmark.scss";
import star from "../star.png";
import starEmpty from "../star-empty.png";

const Bookmark = () => {
  return (
    <>
      {true && <img src={star} alt="Bookmark" />}
      {false && <img src={starEmpty} alt="Bookmark" />}
    </>
  );
};

export default Bookmark;
