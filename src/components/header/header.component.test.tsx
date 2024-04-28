import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createMockRouter } from "@/test-utils/createMockRouter";

import { Header } from "./header.component";

const mockUsePathname = jest.fn();
const mockUseSearchParamsGet = jest.fn();
const mockRouter = createMockRouter({});

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockUsePathname(),
  useSearchParams: jest.fn(() => ({
    get: mockUseSearchParamsGet,
  })),
}));

describe("<Header>", () => {
  beforeEach(() => {
    mockUseSearchParamsGet.mockClear();
    mockUsePathname.mockClear();
  });

  it("renders h1 'Todo ID: 22'", () => {
    mockUseSearchParamsGet.mockImplementation(() => "22");

    render(<Header />);

    const text = screen.getByText("Todo ID: 22");

    expect(text).toBeInTheDocument();
  });

  it("should has an anchor tag with href=/contacts", () => {
    mockUseSearchParamsGet.mockImplementation(() => "33");
    mockUsePathname.mockImplementation(() => "/rebecca");

    render(<Header />);

    const link = screen.getByRole("link", { name: /contacts page/i });

    expect(link).toHaveAttribute("href", "/contacts?id=33&from=/rebecca");
  });

  it("should calls router.push with /contacts when 'Some Action' button is clicked", async () => {
    mockUseSearchParamsGet.mockImplementation(() => "44");
    mockUsePathname.mockImplementation(() => "/viola");

    render(<Header />);

    const button = screen.getByRole("button", { name: /some action/i });
    await userEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith(
      "/contacts?id=44&from=/viola&something=/viola"
    );
  });
});
