import { useState } from "react";

type User = {
  name: string;
  permissions: string[];
  isAdmin: boolean;
  token: string;
};

type LoginParams = {
  username: string;
  password: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  function login({ username, password }: LoginParams) {
    const response = {
      name: "Alice",
      permissions: ["all"],
      isAdmin: true,
      token: "token",
    };
    setUser(response);
  }

  function logout() {
    setUser(null);
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}
