import { useMemo } from "react";
import { mockRecipes } from "@/data/mockRecipes";

export const useRecipes = (query: string) => {
  const filteredRecipes = useMemo(() => {
    if (!query) return mockRecipes;

    return mockRecipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

  return { recipes: filteredRecipes };
};
