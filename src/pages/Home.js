import React from "react";

import { AllFilters, AllTags, AllProducts } from "../components/home.module";
export default function Home() {
  return (
    <div>
      <AllTags />
      <AllFilters />
      <AllProducts />
    </div>
  );
}
