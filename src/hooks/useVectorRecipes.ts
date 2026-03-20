import recipes from "@/data/recipeEmbeddings.json";
import queriesJSON from "@/data/queryEmbeddings.json";
import { ScoredRecipe } from "@/types/recipe";
import { get } from "node:http";

// Type definition for query items
interface Queryitem {
  query: string;
  embedding: number[];
}

const queries: Queryitem[] = queriesJSON as Queryitem[];

// Create a lookup for query embeddings for quick access
const queryEmbeddings: Record<string, number[]> = Object.fromEntries(
  queries.map((q) => [q.query.toLowerCase().trim(), q.embedding])
);

// Function to embed a query using the lookup
function embedQuery(query: string): number[] {
  const input = query.toLowerCase();

  if (
    input.includes("pasta") ||
    input.includes("spaghetti") ||
    input.includes("fettuccine") ||
    input.includes("penne") ||
    input.includes("italian")
  ) {
    return queryEmbeddings["pasta"];
  }

  if (
    input.includes("noodles") ||
    input.includes("ramen") ||
    input.includes("udon") ||
    input.includes("spicy")
  ) {
    return queryEmbeddings["asian noodles"];
  }

  if (
    input.includes("cake") ||
    input.includes("dessert") ||
    input.includes("sweet")
  ) {
    return queryEmbeddings["sweet dessert"];
  }

  // fallback if no match found
  const all = Object.values(queryEmbeddings);

  const avg = all[0].map((_, i) => {
    return all.reduce((sum, vec) => sum + vec[i], 0) / all.length;
  });

  return avg; // fallback
}

// consine similarity function to compare two vectors
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

function getKeywordScore(query: string, recipe: any): number {
  const words = query.toLowerCase().split(" ");

  let score = 0;

  for (const word of words) {
    if (recipe.title.toLowerCase().includes(word)) {
      score += 1;
    }

    for (const ing of recipe.ingredients) {
      if (ing.toLowerCase().includes(word)) {
        score += 1;
      }
    }
  }

  return score;
}

// The hook
export const useVectorRecipe = (query: string): ScoredRecipe[] => {
  if (!query) return [];

  const queryVec = embedQuery(query);

  const scored: ScoredRecipe[] = recipes.map((recipe) => {
    const vectorScore = consineSimilarity(queryVec, recipe.embedding);

    const keywordScore = getKeywordScore(query, recipe);

    const normalizedKeyword = Math.min(keywordScore / 3, 1);

    const finalScore = 0.7 * vectorScore + 0.3 * normalizedKeyword;

    return {
      ...recipe,
      matchCount: Math.round(finalScore * 100), // scale to percentage
      totalQueryCount: 1,
      matchedIngredients: [],
      missingIngredients: [],
    };
  });

  // sort and filter the highest match count first
  return scored
    .filter((r) => r.matchCount > 55)
    .sort((a, b) => b.matchCount - a.matchCount);
};
