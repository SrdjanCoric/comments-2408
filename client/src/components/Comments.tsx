import { CommentWithReplies } from "../types";
import CommentThread from "./CommentThread";

interface CommentsProps {
  comments: CommentWithReplies[];
  onReplies: (commentId: string) => void;
}

const Comments = ({ comments, onReplies }: CommentsProps) => {
  return (
    <div className="comments">
      <h2>Comments ({comments.length})</h2>
      {comments.map((comment) => {
        return (
          <CommentThread
            key={comment.id}
            comment={comment}
            onReplies={onReplies}
          />
        );
      })}
    </div>
  );
};

export default Comments;

// [comment, comment comment]

// {id, replies_count, replies: [reply]}
