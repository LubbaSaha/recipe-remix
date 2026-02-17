// src/app/page.tsx
"use client";

import { Suspense } from "react";
import SearchClient from "@/components/search/SearchClient";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchClient />
    </Suspense>
  );
}