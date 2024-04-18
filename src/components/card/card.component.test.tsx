import { render, screen, within } from "@testing-library/react";

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
  });
});
