export type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  vector: number[]; // embedding
};

export type ScoredRecipe = Recipe & {
  matchCount: number;
  totalQueryCount: number;
  matchedIngredients: string[];
  missingIngredients: string[];
};
