import CommentThread from "./CommentThread";

const Comments = () => {
  return (
    <div className="comments">
      <h2>Comments (2)</h2>
      {["a", "b", "c"].map(() => {
        return <CommentThread />;
      })}
    </div>
  );
};

export default Comments;
