"use client";

import { useState } from "react";
import IngredientInput from "@/components/recipes/IngredientInput";
import RecipeList from "@/components/recipes/RecipeList";
import { useRecipes } from "@/hooks/useRecipes";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const { recipes } = useRecipes(query);

  return (
    <div className="max-w-2xl p-8 mx-auto">
      <IngredientInput value={query} onChange={setQuery} />
      <RecipeList recipes={recipes} />
    </div>
  );
}
