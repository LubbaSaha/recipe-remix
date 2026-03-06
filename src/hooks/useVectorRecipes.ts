import { mockRecipes } from "@/data/mockRecipes";
import { ScoredRecipe } from "@/types/recipe";

function embedQuery(text: string): number[] {
  return text
    .toLowerCase()
    .split("")
    .slice(0, 5)
    .map((c) => c.charCodeAt(0) / 255);
}

function consineSimilarity(vecA: number[], vecB: number[]): number {
  const length = Math.min(vecA.length, vecB.length);

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return dotProduct / (denominator || 1);
}

export const useVectorRecipe = (query: string): ScoredRecipe[] => {
  if (!query) return [];

  const queryVec = embedQuery(query);

  const scored = mockRecipes.map((recipe) => {
    const similiarity = consineSimilarity(queryVec, recipe.embedding);

    return {
      ...recipe,
      matchCount: similiarity,
      totalQueryCount: 1,
      matchedIngredients: [],
      missingIngredients: [],
    };
  });

  return scored.sort((a, b) => b.matchCount - a.matchCount);
};
