import { render, screen, waitFor, within } from "@testing-library/react";
import { MultiStepForm } from "./multi-step-form.component";
import userEvent from "@testing-library/user-event";

const mockOnSubmit = jest.fn();

function setup() {
  render(<MultiStepForm onSubmit={mockOnSubmit} />);
}

describe("<MultiStepForm>", () => {
  it("onSubmit is called when all fields pass validation", async () => {
    setup();

    await userEvent.type(getFirstNameInput(), "Viola");

    const selectJobSituation = getSelectJobSituation();
    await userEvent.selectOptions(
      selectJobSituation,
      within(selectJobSituation).getByRole("option", {
        name: /full-time/i,
      })
    );

    await userEvent.type(getCityInput(), "Vila Real");

    await userEvent.click(getMillionaireCheckbox());

    await clickNextButton();

    const moneyInput = await findMoneyInput();
    await userEvent.type(moneyInput, "1000000");

    await clickNextButton();

    const descriptionInput = await findDescriptionInput();
    await userEvent.type(descriptionInput, "Yo");

    await clickSubmitButton();

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        firstName: "Viola",
        job: "FULL",
        city: "Vila Real",
        millionaire: true,
        money: 1000000,
        description: "Yo",
      });
    });
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("should has 3 required fields on first step", async () => {
    setup();

    await clickNextButton();

    await waitFor(() => {
      expect(getFirstNameInput()).toHaveAccessibleErrorMessage(
        "Your First Name is Required"
      );
    });
    expect(getSelectJobSituation()).toHaveAccessibleErrorMessage(
      "You need to select your job situation"
    );
    expect(getCityInput()).toHaveAccessibleErrorMessage(
      "city is a required field"
    );
  });

  describe("city field", () => {
    it("should show error message when city has less than 8 chars", async () => {
      setup();

      const cityInput = getCityInput();

      await userEvent.type(cityInput, "Vila");
      await userEvent.tab();

      await waitFor(() => {
        expect(cityInput).toHaveAccessibleErrorMessage(
          "city must be at least 8 characters"
        );
      });
    });

    it("should show error message when city has more than 11 chars", async () => {
      setup();

      const cityInput = getCityInput();

      await userEvent.type(cityInput, "Vila Real 96");
      await userEvent.tab();

      await waitFor(() => {
        expect(cityInput).toHaveAccessibleErrorMessage(
          "city must be at most 11 characters"
        );
      });
    });
  });

  describe("first name field", () => {
    it("should show error message when first name has more than 5 chars", async () => {
      setup();

      const firstNameInput = getFirstNameInput();

      await userEvent.type(firstNameInput, "Rebbeca");
      await userEvent.tab();

      await waitFor(() => {
        expect(firstNameInput).toHaveAccessibleErrorMessage(
          "Your name can't be longer than 5 chars"
        );
      });
    });
  });

  describe("money field", () => {
    it("should show error message when money is lower than 1000000 and millionaire selected", async () => {
      setup();
      await userEvent.type(getFirstNameInput(), "Viola");
      const selectJobSituation = getSelectJobSituation();
      await userEvent.selectOptions(
        selectJobSituation,
        within(selectJobSituation).getByRole("option", {
          name: /full-time/i,
        })
      );
      await userEvent.type(getCityInput(), "Vila Real");
      await userEvent.click(getMillionaireCheckbox());
      await clickNextButton();

      const moneyInput = await findMoneyInput();

      await userEvent.type(moneyInput, "100");
      await clickNextButton();

      await waitFor(() => {
        expect(moneyInput).toHaveAccessibleErrorMessage(
          "Because you said you are a millionaire you need to have 1 million"
        );
      });
    });
  });
});

function getFirstNameInput() {
  return screen.getByRole("textbox", { name: /first name/i });
}

function getSelectJobSituation() {
  return screen.getByRole("combobox", { name: /job situation/i });
}

function getCityInput() {
  return screen.getByRole("textbox", { name: /city/i });
}

function getMillionaireCheckbox() {
  return screen.getByRole("checkbox", {
    name: /i am a millionaire/i,
  });
}

function clickNextButton() {
  const nextButton = screen.getByRole("button", { name: /next/i });
  return userEvent.click(nextButton);
}

function findMoneyInput() {
  return screen.findByRole("spinbutton", {
    name: /all the money i have/i,
  });
}

function findDescriptionInput() {
  return screen.findByRole("textbox", {
    name: /description/i,
  });
}

function clickSubmitButton() {
  const submitButton = screen.getByRole("button", { name: /submit/i });
  return userEvent.click(submitButton);
}
