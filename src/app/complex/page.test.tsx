import { render, screen } from "@testing-library/react";

import ComplexPage from "./page";

jest.mock(
  "../../components/very-complex/deep-folder/deeper-folder/very-complex.component"
);

describe("<ComplexPage>", () => {
  it("should render very complex component", () => {
    render(<ComplexPage />);

    const text = screen.queryByText("Very Complex Component");
    const mockText = screen.getByText("SIMPLE VERSION");

    expect(text).not.toBeInTheDocument();
    expect(mockText).toBeInTheDocument();
  });
});
