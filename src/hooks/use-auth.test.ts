import { renderHook, act } from "@testing-library/react";

import { useAuth } from "./use-auth";

describe("useAuth", () => {
  describe("Behavior", () => {
    it("should return default values", () => {
      const { result } = renderHook(() => useAuth());

      expect(result.current.user).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
      expect(typeof result.current.login).toBe("function");
      expect(typeof result.current.logout).toBe("function");
    });

    it("should isAuthenticated to be false and user to be null when logout was called", () => {
      const { result } = renderHook(() => useAuth());

      act(() => {
        result.current.logout();
      });

      expect(result.current.user).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
    });

    it("should isAuthenticated to be true and user contains complete infos when login was called correctly", () => {
      const { result } = renderHook(() => useAuth());

      act(() => {
        result.current.login({
          username: "email@email.com",
          password: "password",
        });
      });

      expect(result.current.user).toEqual({
        name: "Alice",
        permissions: ["all"],
        isAdmin: true,
        token: "token",
      });
      expect(result.current.isAuthenticated).toBe(true);
    });
  });
});
