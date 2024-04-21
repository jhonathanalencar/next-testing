import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Card } from "./card.component";

describe("<Card>", () => {
  describe("Render", () => {
    it("should render component properly", () => {
      render(<Card />);

      // const card = screen.getByTestId("card");
      const divElement = screen.getByRole("group");
      const title = within(divElement).getByRole("heading", {
        level: 2,
        name: /card/i,
      });

      // expect(card).toBeInTheDocument();
      expect(divElement).toBeVisible();
      expect(title).toBeVisible();
    });

    it("should render async component", async () => {
      render(<Card />);

      const paragraph = await screen.findByRole("paragraph");

      expect(paragraph).toBeVisible();
    });

    it("should open component when button was clicked", async () => {
      render(<Card />);

      const button = screen.getByRole("button", { name: /open/i });

      let paragraph = screen.queryByRole("paragraph");

      expect(paragraph).not.toBeInTheDocument();

      await userEvent.click(button);

      paragraph = screen.getByRole("paragraph");

      expect(paragraph).toBeVisible();
    });
  });
});
