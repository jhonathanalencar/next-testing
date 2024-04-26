import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Drawer } from "./drawer.component";

describe("<Drawer>", () => {
  it("should show no 'Hello YouTube!'", () => {
    render(<Drawer />);

    const text = screen.getByText("Hello YouTube!");

    expect(text).not.toBeVisible();
  });

  it("should show 'Hello YouTube!' on 'Open Drawer' button click", async () => {
    render(<Drawer />);

    const button = screen.getByRole("button", { name: /open drawer/i });

    await userEvent.click(button);

    const text = screen.getByText("Hello YouTube!");

    expect(text).toBeVisible();
  });
});
