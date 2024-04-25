import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataGrid } from "@mui/x-data-grid";

import { TablePageContent, rows } from "./table-page-content";

jest.mock("@mui/x-data-grid", () => ({
  ...jest.requireActual("@mui/x-data-grid"),
  DataGrid: jest.fn(() => <div>Table</div>),
}));

const mockedDataGrid = jest.mocked(DataGrid);
const mockOnMoney = jest.fn();

describe("<TablePageContent>", () => {
  beforeEach(() => {
    mockedDataGrid.mockClear();
  });

  it("should render Material UI grid with columnDefs and rowData", async () => {
    render(<TablePageContent onMoney={mockOnMoney} />);

    const button = screen.getByRole("button", { name: /give me 33 dollars/i });
    await userEvent.click(button);

    expect(mockOnMoney).toHaveBeenCalledTimes(1);
    expect(mockOnMoney).toHaveBeenCalledWith(33);
  });

  it("should render table passing the expected props", () => {
    render(<TablePageContent onMoney={mockOnMoney} />);
    expect(mockedDataGrid).toHaveBeenCalledTimes(1);
    expect(mockedDataGrid).toHaveBeenCalledWith(
      {
        rows: rows,
        columns: expect.arrayContaining([
          expect.objectContaining({ field: "id" }),
          expect.objectContaining({ field: "lastName" }),
          expect.objectContaining({ field: "firstName" }),
          expect.objectContaining({ field: "age" }),
        ]),
        initialState: expect.objectContaining({
          pagination: { paginationModel: { pageSize: 5 } },
        }),
        pageSizeOptions: expect.arrayContaining([5]),
        checkboxSelection: true,
      },
      {}
    );
  });
});
