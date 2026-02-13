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
      matchedIngredients: [],
    }));
  }

  return mockRecipes
    .map((recipe: Recipe) => {
      const matchedIngredients = recipe.ingredients.filter((recipeIng) =>
        ingredients.some((ing) => recipeIng.toLowerCase().includes(ing))
      );

      return {
        ...recipe,
        matchCount: matchedIngredients.length,
        totalQueryCount: recipe.ingredients.length,
        matchedIngredients,
      };
    })
    .filter((recipe) => recipe.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);
};