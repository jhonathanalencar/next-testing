import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import type { Photo } from "@/types/photo.type";

import { PhotoList } from "./photo-list.component";

jest.mock("axios");
// jest.spyOn(window, "fetch");

const mockAxios = jest.mocked(axios);
const mockAxiosGet = jest.mocked(mockAxios.get);
const mockAxiosPost = jest.mocked(mockAxios.post);

describe("<PhotoList>", () => {
  beforeEach(() => {
    mockAxiosGet.mockClear();
    mockAxiosPost.mockClear();
  });

  describe("Render", () => {
    beforeEach(() => {
      mockAxiosGet.mockResolvedValue({
        data: [
          {
            id: 1,
            thumbnailUrl: "/photo1.png",
            title: "Hello World",
            favorite: false,
          },
        ] as Photo[],
      });
    });

    it("should show loading message", async () => {
      render(<PhotoList />);

      const text = screen.getByText(/loading.../i);

      await waitForElementToBeRemoved(text);
    });

    it("should render the photos", async () => {
      render(<PhotoList />);

      const text = await screen.findByRole("heading", { name: /hello world/i });

      expect(text).toBeInTheDocument();
    });

    it("should render 'add to favorites' button", async () => {
      render(<PhotoList />);

      const button = await screen.findByRole("button", {
        name: /add to favorites/i,
      });

      expect(button).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    beforeEach(() => {
      mockAxiosGet
        .mockResolvedValueOnce({
          data: [
            {
              id: 1,
              thumbnailUrl: "/photo1.png",
              title: "Hello World",
              favorite: false,
            },
          ] as Photo[],
        })
        .mockResolvedValueOnce({
          data: [
            {
              id: 2,
              thumbnailUrl: "/photo2.png",
              title: "New Loaded Data",
              favorite: false,
            },
          ] as Photo[],
        });

      mockAxiosPost.mockResolvedValue({
        data: {
          id: 1,
          thumbnailUrl: "/photo1.png",
          title: "Hello World",
          favorite: true,
        },
      });
    });

    it("should render the newly loaded data when 'Refresh' button is clicked", async () => {
      render(<PhotoList />);

      const text = await screen.findByRole("heading", { name: /hello world/i });
      expect(text).toBeInTheDocument();

      const button = screen.getByRole("button", { name: /refresh/i });
      await userEvent.click(button);

      await waitFor(() => {
        const text = screen.queryByRole("heading", { name: /hello world/i });
        expect(text).not.toBeInTheDocument();
      });

      await waitFor(() => {
        const newText = screen.getByRole("heading", {
          name: /new loaded data/i,
        });
        expect(newText).toBeInTheDocument();
      });

      expect(mockAxiosGet).toHaveBeenCalledTimes(2);
    });

    it("should perform HTTP call with name=Moonlight", async () => {
      render(<PhotoList />);

      const input = screen.getByLabelText(/your name/i);
      await userEvent.type(input, "Moonlight");

      expect(mockAxiosGet).toHaveBeenCalledWith("/api/photos?name=Moonlight");
    });

    it("should render 'remove from favorites' button when 'add to favorites' is clicked", async () => {
      render(<PhotoList />);

      const addButton = await screen.findByRole("button", {
        name: /add to favorites/i,
      });
      await userEvent.click(addButton);

      await waitFor(() => {
        const addButton = screen.queryByRole("button", {
          name: /add to favorites/i,
        });
        expect(addButton).not.toBeInTheDocument();
      });

      await waitFor(() => {
        const removeButton = screen.getByRole("button", {
          name: /remove from favorites/i,
        });
        expect(removeButton).toBeInTheDocument();
      });

      expect(mockAxiosPost).toHaveBeenCalledTimes(1);
    });
  });
});
