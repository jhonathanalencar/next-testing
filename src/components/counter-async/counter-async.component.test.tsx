import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CounterAsync } from "./counter-async.component";

const mockDefaultCount = 10;

const setup = () =>
  render(<CounterAsync defaultCount={mockDefaultCount} description="WWW" />);

describe("<CounterAsync>", () => {
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

    it("should render the text 'too small' when initialized with defaultCount less than 15", () => {
      setup();

      const text = screen.getByText(/too small/i);

      expect(text).toBeInTheDocument();
    });

    it("should not render the text 'too small' when initialized with defaultCount greater or equal to 15", () => {
      render(<CounterAsync defaultCount={15} description="WWW" />);

      const text = screen.queryByText(/too small/i);

      expect(text).not.toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("should increment counter by the incrementor quantity when '+' button is clicked", async () => {
      setup();

      const incrementor = screen.getByLabelText(/incrementor/i);
      const button = screen.getByRole("button", { name: /increment counter/i });
      await userEvent.type(incrementor, "{backspace}5");
      await userEvent.click(button);

      const text = await screen.findByText(
        `Current Count: ${mockDefaultCount + 5}`
      );

      expect(text).toBeInTheDocument();
    });

    it("should decrement counter by the incrementor quantity when '-' button is clicked", async () => {
      setup();

      const incrementor = screen.getByLabelText(/incrementor/i);
      const button = screen.getByRole("button", { name: /decrement counter/i });
      await userEvent.type(incrementor, "{backspace}5");
      await userEvent.click(button);

      const text = await screen.findByText(
        `Current Count: ${mockDefaultCount - 5}`
      );

      expect(text).toBeInTheDocument();
    });

    it("should remove the text 'too small' when counter is greater or equal to 15", async () => {
      setup();

      const incrementor = screen.getByLabelText(/incrementor/i);
      const button = screen.getByRole("button", { name: /increment counter/i });
      await userEvent.type(incrementor, "{backspace}5");
      await userEvent.click(button);

      await waitForElementToBeRemoved(() => screen.queryByText(/too small/i));
    });
  });
});
