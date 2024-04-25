"use client";

import { TablePageContent } from "./table-page-content";

export default function TablePage() {
  return (
    <TablePageContent
      onMoney={(money) => {
        alert(money);
      }}
    />
  );
}
