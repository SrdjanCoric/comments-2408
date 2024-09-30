import axios from "axios";
import { CommentWithReplies, NewComment, Reply } from "../types";
import { z } from "zod";

const replySchema = z.object({
  id: z.string(),
  comment_id: z.string(),
  author: z.string(),
  body: z.string(),
  postedAt: z.number(),
});

const commentSchema = z.object({
  id: z.string(),
  author: z.string(),
  body: z.string(),
  postedAt: z.number(),
  replies_count: z.number(),
  replies: z.array(replySchema),
});

// type CommentWithReplies = z.infer<typeof commentSchema>;

const getCommentsResponseSchema = z.array(commentSchema);
const getRepliesResponseSchema = z.array(replySchema);

export const getComments = async () => {
  const { data } = await axios.get<CommentWithReplies[]>(
    "http://localhost:3001/api/comments"
  );
  return getCommentsResponseSchema.parse(data);
};

export const getReplies = async (commentId: string) => {
  const { data } = await axios.get<Reply[]>(
    `/api/comment_replies?comment_id=${commentId}`
  );
  return getRepliesResponseSchema.parse(data);
};

export const createComment = async (newComment: NewComment) => {
  const { data } = await axios.post<CommentWithReplies>("/api/comments", {
    ...newComment,
  });
  return data;
};
