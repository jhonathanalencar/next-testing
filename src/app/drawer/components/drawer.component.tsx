"use client";

import { useState } from "react";
import { Button, SwipeableDrawer } from "@mui/material";

export function Drawer() {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <h2>Hello Drawer Component!</h2>
      <Button variant="contained" onClick={() => setOpened(true)}>
        Open Drawer
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={opened}
        onClose={() => setOpened(false)}
        onOpen={() => setOpened(true)}
      >
        Hello YouTube!
      </SwipeableDrawer>
    </div>
  );
}
