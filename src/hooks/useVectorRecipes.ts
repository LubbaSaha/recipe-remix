import recipes from "@/data/recipeEmbeddings.json";
import queriesJSON from "@/data/queryEmbeddings.json";
import { ScoredRecipe } from "@/types/recipe";

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

  for (const q of queries) {
    if (input.includes(q.query)) {
      return q.embedding;
    }
  }

  // random fallback if no match found
  const random = queries[Math.floor(Math.random() * queries.length)];

  return random.embedding; // fallback
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

// The hook
export const useVectorRecipe = (query: string): ScoredRecipe[] => {
  if (!query) return [];

  const queryVec = embedQuery(query);

  const scored: ScoredRecipe[] = recipes.map((recipe) => {
    const similiarity = consineSimilarity(queryVec, recipe.embedding);

    return {
      ...recipe,
      matchCount: Math.round(similiarity * 100),
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
