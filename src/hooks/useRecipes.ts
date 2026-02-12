import { mockRecipes } from "@/data/mockRecipes";
import { Recipe } from "@/types/recipe";

export const useRecipes = (query: string) => {
  const ingredients = query
    .split(",")
    .map((ing) => ing.trim().toLowerCase())
    .filter(Boolean);

  const recipes = mockRecipes.filter((recipe: Recipe) => {

    return ingredients.some((ing) => {
      return recipe.ingredients.some((recipeIng) =>
        recipeIng.toLowerCase().includes(ing)
      );
    });

  });

  return recipes;
};