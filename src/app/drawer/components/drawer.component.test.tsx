import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Drawer } from "./drawer.component";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  SwipeableDrawer: jest.fn(() => <div>HELLOOO</div>),
}));

describe("<Drawer>", () => {
  it("should show 'HELLOOO'", () => {
    render(<Drawer />);

    const text = screen.getByText("HELLOOO");

    expect(text).toBeInTheDocument();
  });

  it("should show 'HELLOOO' on 'Open Drawer' button click", async () => {
    render(<Drawer />);

    const button = screen.getByRole("button", { name: /open drawer/i });

    await userEvent.click(button);

    const text = screen.getByText("HELLOOO");

    expect(text).toBeInTheDocument();
  });
});
