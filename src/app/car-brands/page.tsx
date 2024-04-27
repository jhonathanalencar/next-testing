"use client";

import { useState } from "react";

import { CarBrands } from "./components/car-brands.component";
import { MySwrConfig } from "./components/my-swr-config.component";

export default function CarBrandsPage() {
  const [country, setCountry] = useState<"Germany" | "France" | "Italy">(
    "Germany"
  );
  return (
    <MySwrConfig>
      <h1>Car App</h1>
      <button onClick={() => setCountry("Germany")}>Germany</button>
      <button onClick={() => setCountry("France")}>France</button>
      <button onClick={() => setCountry("Italy")}>Italy</button>

      <CarBrands country={country} />
    </MySwrConfig>
  );
}
