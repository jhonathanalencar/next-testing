import { calculateRandomBetween } from "./calculate-random-between.helper";

const spyMathRandom = jest.spyOn(Math, "random");

describe("calculateRandomBetween()", () => {
  describe("when Math.random() returns 0", () => {
    beforeEach(() => {
      spyMathRandom.mockClear().mockReturnValue(0);
    });

    it("should return 3 when min=3 and max=5", () => {
      expect(calculateRandomBetween(3, 5)).toBe(3);
      expect(spyMathRandom).toHaveBeenCalledTimes(1);
    });
  });

  describe("when Math.random() returns 0.5", () => {
    beforeEach(() => {
      spyMathRandom.mockClear().mockReturnValue(0.5);
    });

    it("should return 3 when min=3 and max=5", () => {
      expect(calculateRandomBetween(3, 5)).toBe(4);
      expect(spyMathRandom).toHaveBeenCalledTimes(1);
    });
  });

  describe("when Math.random() returns 0.99999", () => {
    beforeEach(() => {
      spyMathRandom.mockClear().mockImplementation(() => 0.99999);
    });

    it("should return 3 when min=3 and max=5", () => {
      expect(calculateRandomBetween(3, 5)).toBe(5);
      expect(spyMathRandom).toHaveBeenCalledTimes(1);
    });
  });
});
