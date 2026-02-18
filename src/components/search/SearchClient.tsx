"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import IngredientInput from "@/components/recipes/IngredientInput";
import RecipeList from "@/components/recipes/RecipeList";
import { useRecipes } from "@/hooks/useRecipes";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchClient() {
  const router = useRouter();
  const pathname = usePathname();

  const [input, setInput] = useState(""); // local input state
  const debouncedQuery = useDebounce(input, 300); // for search & URL

  const recipes = useRecipes(debouncedQuery);

  // Update URL only after debouncedQuery changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedQuery) params.set("ingredients", debouncedQuery);
    else params.delete("ingredients");

    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  }, [debouncedQuery, pathname]);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <IngredientInput value={input} onChange={setInput} />
      <RecipeList recipes={recipes} />
    </div>
  );
}