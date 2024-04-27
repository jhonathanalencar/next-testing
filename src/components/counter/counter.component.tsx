"use client";

import { useState } from "react";

interface CounterProps {
  description: string;
  defaultCount: number;
}

export function Counter({ description, defaultCount }: CounterProps) {
  const [count, setCount] = useState(defaultCount);
  const [incrementor, setIncrementor] = useState(1);

  return (
    <div>
      <h2>
        DESC: {description} - DC: {defaultCount}
      </h2>
      <label>
        Incrementor:
        <input
          value={incrementor}
          onChange={(event) => {
            setIncrementor(parseInt(event.target.value));
          }}
          type="number"
        />
      </label>
      <button
        aria-label="Decrement counter"
        onClick={() => setCount((prev) => prev - incrementor)}
      >
        -
      </button>
      Current Count: {count}
      <button
        aria-label="Increment counter"
        onClick={() => setCount((prev) => prev + incrementor)}
      >
        +
      </button>
    </div>
  );
}
