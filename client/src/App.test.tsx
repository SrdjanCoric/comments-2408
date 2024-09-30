import { render, screen } from "@testing-library/react";
import App from "./App";
import * as commentService from "./services/comments";
import { CommentWithReplies, Reply } from "./types";
import userEvent from "@testing-library/user-event";
// stripped away implementation of the function so now it returns a Promise that resolves to undefined
vi.mock("./services/comments.ts");

const mockedCommentService = vi.mocked(commentService);

describe("App", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("fetches comments", async () => {
    const mockedComments: CommentWithReplies[] = [
      {
        id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
        author: "Srdjan",
        body: "Sint in in sunt amet.",
        postedAt: 1550488214207,
        replies_count: 3,
        replies: [
          {
            id: "116dbd01-d5f3-4dfb-afeb-f822a9264a5e",
            comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
            author: "Kathleen Nikolaus",
            body: "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
            postedAt: 1550419941546,
          },
        ],
      },
    ];
    mockedCommentService.getComments.mockResolvedValue(mockedComments);
    render(<App />);
    const authorHeading = await screen.findByRole("heading", {
      level: 3,
      name: /Srdjan/,
    });
    expect(authorHeading).toBeInTheDocument();
  });
  it("when I click show more replies link, replies are shown and the link is gone", async () => {
    const mockedComments: CommentWithReplies[] = [
      {
        id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
        author: "Srdjan",
        body: "Sint in in sunt amet.",
        postedAt: 1550488214207,
        replies_count: 3,
        replies: [
          {
            id: "116dbd01-d5f3-4dfb-afeb-f822a9264a5e",
            comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
            author: "Kathleen Nikolaus",
            body: "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
            postedAt: 1550419941546,
          },
        ],
      },
    ];
    const replies: Reply[] = [
      {
        id: "116dbd01-d5f3-4dfb-afeb-f822a9264a4e",
        comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
        author: "Sean Nikolaus",
        body: "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
        postedAt: 1550419941541,
      },
      {
        id: "116dbd01-d5f3-4dfb-afeb-f822a9264a3a",
        comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
        author: "Jane Nikolaus",
        body: "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
        postedAt: 1550419941541,
      },
    ];
    mockedCommentService.getComments.mockResolvedValue(mockedComments);
    mockedCommentService.getReplies.mockResolvedValue(replies);
    render(<App />);
    const link = await screen.findByRole("link", { name: /Show More Replies/ });
    const user = userEvent.setup();

    await user.click(link);
    const replyAuthor = screen.getByRole("heading", { name: /Jane/ });
    expect(replyAuthor).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
  });
});

// await waitFor(() => {
//   const commentHeading = screen.getByRole("heading", {
//     level: 3,
//     name: /Reed/,
//   });
//   expect(commentHeading).toBeInTheDocument();
// });
