export type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  embedding: number[]; // embedding
};

export type ScoredRecipe = Recipe & {
  matchCount: number;
  totalQueryCount: number;
  matchedIngredients: string[];
  missingIngredients: string[];
};
