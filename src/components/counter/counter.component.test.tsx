import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Counter } from "./counter.component";

const mockDefaultCount = 10;

const setup = () =>
  render(<Counter defaultCount={mockDefaultCount} description="WWW" />);

describe("<Counter>", () => {
  describe("Render", () => {
    it("should render 'Current Count: 10' when initialized with defaultCount=10", () => {
      setup();

      const text = screen.getByText(/Current Count: 10/i);

      expect(text).toBeInTheDocument();
    });

    it("should render the title as 'WWW' when initialized with description='WWW'", () => {
      setup();

      const text = screen.getByRole("heading", { name: /www/i });

      expect(text).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("should increment counter by the incrementor quantity when '+' button is clicked", async () => {
      setup();

      const incrementor = screen.getByLabelText(/incrementor/i);
      const button = screen.getByRole("button", { name: /increment counter/i });
      await userEvent.type(incrementor, "{backspace}5");
      await userEvent.click(button);

      const text = screen.getByText(`Current Count: ${mockDefaultCount + 5}`);

      expect(text).toBeInTheDocument();
    });

    it("should decrement counter by the incrementor quantity when '-' button is clicked", async () => {
      setup();

      const incrementor = screen.getByLabelText(/incrementor/i);
      const button = screen.getByRole("button", { name: /decrement counter/i });
      await userEvent.type(incrementor, "{backspace}5");
      await userEvent.click(button);

      const text = screen.getByText(`Current Count: ${mockDefaultCount - 5}`);

      expect(text).toBeInTheDocument();
    });
  });
});
