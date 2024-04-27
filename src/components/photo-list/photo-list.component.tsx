"use client";

import { useState } from "react";

import { List } from "./components/list.component";

export function PhotoList() {
  const [refresh, setRefresh] = useState(0);
  const [name, setName] = useState("");

  return (
    <div>
      <button onClick={() => setRefresh((cr) => ++cr)}>Refresh</button>
      <div>
        <label>
          Your Name:
          <input
            name="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <List refresh={refresh} name={name} />
      </div>
    </div>
  );
}
