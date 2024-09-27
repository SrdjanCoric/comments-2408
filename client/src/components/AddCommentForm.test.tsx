import AddCommentForm from "./AddCommentForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("AddCommentForm Component", () => {
  it("contains h2 heading", () => {
    render(<AddCommentForm onSubmit={vi.fn()} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });
  it("changes the input text when author changes", async () => {
    render(<AddCommentForm onSubmit={vi.fn()} />);
    const inputAuthor = screen.getByRole("textbox", { name: "Your Name" });
    const user = userEvent.setup();
    await user.type(inputAuthor, "Srdjan");
    expect(inputAuthor).toHaveValue("Srdjan");
  });
  it("changes the input text when body changes", async () => {
    render(<AddCommentForm onSubmit={vi.fn()} />);
    const inputBody = screen.getByRole("textbox", { name: "Your Comment" });
    const user = userEvent.setup();
    await user.type(inputBody, "My Comment");
    expect(inputBody).toHaveValue("My Comment");
  });
});
