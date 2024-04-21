"use client";

import { useEffect, useState } from "react";

export function Card() {
  const [isVisible, setIsVisible] = useState(false);

  function handleOpen() {
    setIsVisible(true);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div data-testid="card" role="group">
      <h2>Card</h2>

      <button onClick={handleOpen}>Open</button>

      {isVisible ? (
        <div>
          <p role="paragraph">Content</p>
        </div>
      ) : null}
    </div>
  );
}
