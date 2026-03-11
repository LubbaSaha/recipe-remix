import recipes from "@/data/recipeEmbeddings.json";
import { ScoredRecipe } from "@/types/recipe";

const queryEmbeddings: Record<string, number[]> = {
  "sweet dessert": [0.0429, 0.055, 0.0555, 0.0506, 0.0129, 0.0523],
  pasta: [0.0476, 0.043, 0.0512, 0.0505, 0.0424, 0.0377],
  noodles: [0.0548, 0.0508, 0.0078, 0.0534, 0.023, 0.0478],
};

function embedQuery(query: string): number[] {
  const key = query.toLowerCase().trim();

  if (queryEmbeddings[key]) {
    return queryEmbeddings[key];
  }

  return [0, 0, 0, 0, 0]; // fallback
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

  return dotProduct / denominator;
}

export const useVectorRecipe = (query: string): ScoredRecipe[] => {
  if (!query) return [];

  const queryVec = embedQuery(query);

  const scored = recipes.map((recipe) => {
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
