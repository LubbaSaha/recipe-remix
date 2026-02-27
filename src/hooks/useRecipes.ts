import { mockRecipes } from "@/data/mockRecipes";
import { ScoredRecipe, Recipe } from "@/types/recipe";
import { parseQuery, getMatchedIngredients } from "@/lib/matching";

export const useRecipes = (
  query: string,
  showFullMatchOnly: boolean
): ScoredRecipe[] => {
  const queryIngredients = parseQuery(query);

  // if query is empty, return all recipes with empty scoring
  if (queryIngredients.length === 0) {
    return mockRecipes.map((recipe) => ({
      ...recipe,
      matchCount: 0,
      totalQueryCount: 0,
      matchedIngredients: [] as string[],
      missingIngredients: [] as string[],
    }));
  }

  // compute scored recipes
  const scored: ScoredRecipe[] = mockRecipes.map((recipe) => {
    const matchedIngredients = getMatchedIngredients(
      recipe.ingredients,
      queryIngredients
    );

    const missingIngredients = queryIngredients.filter(
      (q) => !matchedIngredients.includes(q)
    );

    return {
      ...recipe,
      matchCount: matchedIngredients.length,
      totalQueryCount: queryIngredients.length,
      matchedIngredients,
      missingIngredients,
    };
  });

  // sort recipes by match count descending
  const sorted = scored
    .filter((r) => r.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);

  // optionally filter only full matches
  if (showFullMatchOnly) {
    return sorted.filter((r) => r.matchCount === r.totalQueryCount);
  }

  return sorted;
};
