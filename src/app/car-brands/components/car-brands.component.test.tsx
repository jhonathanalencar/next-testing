import { render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { MySwrConfig } from "./my-swr-config.component";
import { CarBrands } from "./car-brands.component";

const server = setupServer(
  http.get("/api/cars/france", () => {
    return HttpResponse.json([`Custom France B1`, `Custom France B2`], {
      status: 200,
    });
  }),
  http.get("/api/cars/germany", () => {
    return HttpResponse.json([`Custom Germany B1`, `Custom Germany B2`], {
      status: 200,
    });
  }),
  http.get("/api/cars/italy", () => {
    return new HttpResponse(JSON.stringify({ message: "Unit test message" }), {
      status: 500,
    });
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

function setup(country: "Germany" | "France" | "Italy") {
  render(
    <MySwrConfig swrConfig={{ dedupingInterval: 0, provider: () => new Map() }}>
      <CarBrands country={country} />
    </MySwrConfig>
  );
}

describe("<CarBrands>", () => {
  it("should render car brands from France", async () => {
    setup("France");

    const text = screen.getByRole("heading", {
      name: /car brands from france/i,
    });
    expect(text).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Custom France B1")).toBeInTheDocument();
    });
    expect(screen.getByText("Custom France B2")).toBeInTheDocument();
  });

  it("should render car brands from Germany", async () => {
    setup("Germany");

    const text = screen.getByRole("heading", {
      name: /car brands from germany/i,
    });
    expect(text).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Custom Germany B1")).toBeInTheDocument();
    });
    expect(screen.getByText("Custom Germany B2")).toBeInTheDocument();
  });

  it("should render car brands from Italy", async () => {
    setup("Italy");

    const text = screen.getByRole("heading", {
      name: /car brands from italy/i,
    });
    expect(text).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/unit test message/i)).toBeInTheDocument();
    });
  });

  it("should render the text no results", async () => {
    server.use(
      http.get("/api/cars/italy", () => {
        return HttpResponse.json([], {
          status: 200,
        });
      })
    );

    setup("Italy");

    await waitFor(() => {
      expect(screen.getByText("No Data to Show")).toBeInTheDocument();
    });
  });
});
