"use client";

import { useState } from "react";

export const STORAGE_KEY = "APP:";

export function getLocalStorage(key: string) {
  const data = localStorage.getItem(`${STORAGE_KEY}${key}`);
  if (!data) return null;
  return JSON.parse(data);
}

export function setLocalStorage(key: string, value: unknown) {
  localStorage.setItem(`${STORAGE_KEY}${key}`, JSON.stringify(value));
}

export default function StoragePage() {
  const [data, setData] = useState<any | null>(null);

  function handleGetLocalStorage() {
    const item = getLocalStorage("item_key");
    setData(item);
  }

  function handleSetLocalStorage() {
    setLocalStorage("item_key", "Mikasa");
  }

  return (
    <main>
      <h2>Storage</h2>

      <p>{data}</p>

      <button onClick={handleSetLocalStorage}>SET</button>
      <button onClick={handleGetLocalStorage}>GET</button>
    </main>
  );
}
