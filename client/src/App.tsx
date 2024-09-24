import Comments from "./components/Comments";
import AddCommentForm from "./components/AddCommentForm";
import React from "react";
import data from "./mockData/comments";
import { CommentWithReplies } from "./types";

function App() {
  const [comments, setComments] = React.useState<CommentWithReplies[]>([]);

  React.useEffect(() => {
    // fetch
    setComments(data);
  }, []);
  return (
    <div>
      <Comments comments={comments} />
      <AddCommentForm />
    </div>
  );
}

export default App;
