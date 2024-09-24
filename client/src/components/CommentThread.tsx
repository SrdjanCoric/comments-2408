import { CommentWithReplies } from "../types";
import Comment from "./Comment";

interface CommentThreadProps {
  comment: CommentWithReplies;
}

const CommentThread = ({ comment }: CommentThreadProps) => {
  return (
    <div className="parent-comment">
      <Comment {...comment} />
      <div className="replies">
        {comment.replies.map((reply) => {
          return <Comment key={reply.id} {...comment} />;
        })}
        <a href="#" className="show_more">
          Show More Replies (2)
        </a>
      </div>
    </div>
  );
};

export default CommentThread;
