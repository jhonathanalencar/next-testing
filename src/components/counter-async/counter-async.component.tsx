"use client";

import { useEffect, useState } from "react";

interface CounterAsyncProps {
  description: string;
  defaultCount: number;
}

export function CounterAsync({ description, defaultCount }: CounterAsyncProps) {
  const [count, setCount] = useState(defaultCount);
  const [incrementor, setIncrementor] = useState(1);
  const [bigEnough, setBigEnough] = useState(() => defaultCount >= 15);

  function handleIncrementCounter() {
    setTimeout(() => {
      setCount((prev) => prev + incrementor);
    }, 200);
  }

  function handleDecrementCounter() {
    setTimeout(() => {
      setCount((prev) => prev - incrementor);
    }, 200);
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (count >= 15) {
      timeout = setTimeout(() => {
        setBigEnough(true);
      }, 300);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [count]);

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
      <button aria-label="Decrement counter" onClick={handleDecrementCounter}>
        -
      </button>
      Current Count: {count}
      <button aria-label="Increment counter" onClick={handleIncrementCounter}>
        +
      </button>
      {!bigEnough ? <p>too small</p> : null}
    </div>
  );
}
