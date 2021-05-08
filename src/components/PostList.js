import "./PostList.scss";
import PostListItem from "./PostListItem";

const PostList = (props) => {
  return (
    <div className="PostList">
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
    </div>
  );
};

export default PostList;
