export type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
};

export type ScoredRecipe = Recipe & {
  matchCount: number;
};