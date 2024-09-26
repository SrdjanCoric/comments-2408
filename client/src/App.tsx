import Comments from "./components/Comments";
import AddCommentForm from "./components/AddCommentForm";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CommentWithReplies, NewComment } from "./types";
import { createComment, getComments, getReplies } from "./services/comments";
import FourOhFour from "./components/FourOhFour";
import { ZodError } from "zod";

function App() {
  const [comments, setComments] = React.useState<CommentWithReplies[]>([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    // fetch
    const fetchComments = async () => {
      try {
        const data = await getComments();
        setComments(data);
      } catch (e) {
        if (e instanceof ZodError) {
          console.log("Hello From Zod");
        }
        setError(true);
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

  if (error) {
    return <FourOhFour />;
  }

  // handler function to update state of comments with new replies
  return (
    <ErrorBoundary fallback={<FourOhFour />}>
      <div>
        <Comments comments={comments} onReplies={handleReplies} />
        <AddCommentForm onSubmit={handleSubmit} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
