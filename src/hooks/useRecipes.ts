import { mockRecipes } from "@/data/mockRecipes";
import { Recipe, ScoredRecipe } from "@/types/recipe";

export const useRecipes = (query: string): ScoredRecipe[] => {
  const ingredients = query
    .split(",")
    .map((ing) => ing.trim().toLowerCase())
    .filter(Boolean);

  const recipes = mockRecipes
    .map((recipe: Recipe) => {
      const matchCount = ingredients.filter((ing) =>
        recipe.ingredients.some((recipeIng) =>
          recipeIng.toLowerCase().includes(ing)
        )
      ).length;

      return { ...recipe, matchCount };
    })
    .filter((recipe) => recipe.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);

  return recipes;
};