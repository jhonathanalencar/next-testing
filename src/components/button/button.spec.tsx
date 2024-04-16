import { render, screen } from "@testing-library/react";

import { Button } from "./button.component";

describe("<Button>", () => {
  describe("Render", () => {
    it("should render a button", () => {
      render(<Button>Click</Button>);

      const button = screen.getByRole("button", {
        name: /click/i,
      });

      expect(button).toBeInTheDocument();
    });

    it("should render 'Loading...' text when isLoading was passed as true", () => {
      render(<Button isLoading>Click</Button>);

      const button = screen.getByRole("button", { name: /loading.../i });

      expect(button).toBeInTheDocument();
    });

    it("should render the button with background color green by default", () => {
      render(<Button>Click</Button>);

      const button = screen.getByRole("button", { name: /click/i });

      expect(button).toHaveStyle({
        "background-color": "green",
      });
    });

    it("should render a button with the given children text and red background color red when color prop is set to 'red'", () => {
      render(<Button color="red">Click</Button>);

      const button = screen.getByRole("button");

      expect(button).toHaveStyle({ "background-color": "red" });
    });
  });
});
