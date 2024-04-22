import { STORAGE_KEY, getLocalStorage, setLocalStorage } from "./page";

describe("getLocalStorage", () => {
  it("should return item from localStorage", async () => {
    window.localStorage.setItem(`${STORAGE_KEY}key`, JSON.stringify("Mikasa"));

    expect(getLocalStorage("key")).toStrictEqual("Mikasa");
  });
});

describe("setLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should add the item to localStorage", () => {
    setLocalStorage("key", "Kage");

    expect(window.localStorage.getItem(`${STORAGE_KEY}key`)).toStrictEqual(
      JSON.stringify("Kage")
    );
  });
});
