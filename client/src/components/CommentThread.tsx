import Comment from "./Comment";

const CommentThread = () => {
  return (
    <div className="parent-comment">
      <Comment />
      <div className="replies">
        <Comment />
        <a href="#" className="show_more">
          Show More Replies (2)
        </a>
      </div>
    </div>
  );
};

export default CommentThread;
