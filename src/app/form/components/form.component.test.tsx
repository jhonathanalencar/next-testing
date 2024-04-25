import { render, screen, logRoles, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Form } from "./form.component";

const mockHandleSubmitForm = jest.fn();

describe("<Form>", () => {
  describe("Render", () => {
    it("should render default correctly", () => {
      const view = render(<Form handleSubmitForm={mockHandleSubmitForm} />);

      logRoles(view.container);

      const inputName = screen.getByRole("textbox", { name: "Name" });
      const inputLastName = screen.getByRole("textbox", { name: "Last Name" });
      const submitButton = screen.getByRole("button", { name: /submit/i });

      expect(inputName).toBeVisible();
      expect(inputLastName).toBeVisible();
      expect(submitButton).toBeVisible();
    });
  });

  describe("Behavior", () => {
    it("should show an error message on submit if the fields are empty", async () => {
      render(<Form handleSubmitForm={mockHandleSubmitForm} />);

      const submitButton = screen.getByRole("button", { name: /submit/i });

      act(() => {
        userEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText("Name is invalid")).toBeVisible();
        expect(screen.getByText("Last name is invalid")).toBeVisible();
      });
    });

    it("should type into name and lastName fields and submit form", async () => {
      render(<Form handleSubmitForm={mockHandleSubmitForm} />);

      const mockName = "Cid";
      const mockLastName = "Kagenou";

      const inputName = screen.getByRole("textbox", { name: "Name" });
      const inputLastName = screen.getByRole("textbox", { name: "Last Name" });
      const submitButton = screen.getByRole("button", { name: /submit/i });

      await userEvent.type(inputName, mockName);
      await userEvent.type(inputLastName, mockLastName);
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText("Name is invalid")).not.toBeInTheDocument();
        expect(
          screen.queryByText("Last name is invalid")
        ).not.toBeInTheDocument();
      });

      await waitFor(() => {
        expect(inputName).toHaveValue(mockName);
        expect(inputLastName).toHaveValue(mockLastName);
        expect(mockHandleSubmitForm).toHaveBeenCalledTimes(1);
        expect(mockHandleSubmitForm).toHaveBeenCalledWith(
          {
            name: mockName,
            lastName: mockLastName,
          },
          expect.anything()
        );
      });
    });
  });
});
