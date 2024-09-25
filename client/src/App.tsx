import Comments from "./components/Comments";
import AddCommentForm from "./components/AddCommentForm";
import React from "react";

import { CommentWithReplies, NewComment } from "./types";
import { createComment, getComments, getReplies } from "./services/comments";

function App() {
  const [comments, setComments] = React.useState<CommentWithReplies[]>([]);

  React.useEffect(() => {
    // fetch
    const fetchComments = async () => {
      try {
        const data = await getComments();
        setComments(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchComments();
  }, []);

  const handleReplies = async (commentId: string) => {
    try {
      const data = await getReplies(commentId);
      setComments((prevState) =>
        prevState.map((c) => {
          if (c.id === commentId) {
            return { ...c, replies: c.replies.concat(data) };
          } else {
            return c;
          }
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (
    newComment: NewComment,
    callback?: () => void
  ) => {
    try {
      const data = await createComment(newComment);
      setComments((prevState) => prevState.concat(data));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // handler function to update state of comments with new replies
  return (
    <div>
      <Comments comments={comments} onReplies={handleReplies} />
      <AddCommentForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
