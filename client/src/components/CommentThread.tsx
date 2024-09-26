import { CommentWithReplies } from "../types";
import React from "react";
import Comment from "./Comment";

interface CommentThreadProps {
  comment: CommentWithReplies;
  onReplies: (commentId: string) => void;
}

const CommentThread = ({ comment, onReplies }: CommentThreadProps) => {
  // handler function to update state of comments with new replies
  const handleMoreReplies = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onReplies(comment.id);
  };
  return (
    <div className="parent-comment">
      <Comment {...comment} />
      <div className="replies">
        {comment.replies.map((reply) => {
          return <Comment key={reply.id} {...reply} />;
        })}
        {4 === comment.replies.length ? null : (
          <a href="#" className="show_more" onClick={handleMoreReplies}>
            Show More Replies ({comment.replies_count - 1})
          </a>
        )}
      </div>
    </div>
  );
};

export default CommentThread;

// state = [comment, comment, comment]

// setState(comments.concat(comment))
// interface CommentThreadProps {
//   comment: CommentWithReplies;
//   setComments: React.Dispatch<React.SetStateAction<CommentWithReplies[]>>;
// }

// const CommentThread = ({ comment, setComments }: CommentThreadProps) => {
//   // handler function to update state of comments with new replies
//   const handleReplies = async () => {
//     const { data } = await axios.get(
//       `/api/comment_replies?comment_id=${comment.id}`
//     );
//     console.log(data);
//     setComments((prevState) =>
//       prevState.map((c) => {
//         if (c.id === comment.id) {
//           return { ...c, replies: c.replies.concat(data) };
//         } else {
//           return c;
//         }
//       })
//     );
//   };
