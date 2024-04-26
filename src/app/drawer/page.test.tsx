import { render, screen } from "@testing-library/react";

import DrawerPage from "./page";
import { Drawer } from "./components/drawer.component";

// jest.mock("./components/drawer.component", () => ({
//   Drawer: jest.fn(() => <div>mocked: drawer</div>),
// }));
jest.mock("./components/drawer.component");
jest.mocked(Drawer).mockImplementation(() => <div>mocked: drawer</div>);

describe("<DrawerPage />", () => {
  it("should render Drawer component", () => {
    render(<DrawerPage />);

    const heading = screen.queryByRole("heading", {
      name: /hello drawer component/i,
    });
    const text = screen.getByText(/mocked: drawer/i);

    expect(heading).not.toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
