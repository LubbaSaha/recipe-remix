import { mockRecipes } from "@/data/mockRecipes";
import { ScoredRecipe, Recipe } from "@/types/recipe";

export const useRecipes = (query: string): ScoredRecipe[] => {
  const ingredients = query
    .split(",")
    .map((i) => i.trim().toLowerCase())
    .filter(Boolean);

  if (ingredients.length === 0) {
    return mockRecipes.map((recipe) => ({
      ...recipe,
      matchCount: 0,
      totalQueryCount: 0,
      matchedIngredients: [] as string[],
      missingIngredients: [] as string[],
    }));
  }

  const scored = mockRecipes.map((recipe) => {
    const recipeIngredients = recipe.ingredients.map((ing) =>
      ing.toLocaleLowerCase()
    );

    const matchedIngredients = ingredients.filter((ing) =>
      recipeIngredients.some((recipeIng) => recipeIng.includes(ing))
    );

    const missingIngredients = ingredients.filter((ing) =>
      !matchedIngredients.includes(ing)
    );

    return {
      ...recipe,
      matchCount: matchedIngredients.length,
      totalQueryCount: ingredients.length,
      matchedIngredients,
      missingIngredients,
    }
  });

  return scored
    .filter((sr) => sr.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);
};
