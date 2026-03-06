import { Recipe } from "@/types/recipe";

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Tomato Pasta",
    description: "Simple pasta with tomato sauce",
    ingredients: ["tomato", "pasta", "salt", "Olive oil", "Garlic", "Parsley"],
    embedding: [0.21, 0.77, 0.45, 0.11, 0.63], // dummy embedding vector
  },

  {
    id: "2",
    title: "Egg Fried Rice",
    description: "Quick fried rice with eggs",
    ingredients: ["rice", "egg", "salt"],
    embedding: [0.66, 0.12, 0.48, 0.32, 0.55], // dummy embedding vector
  },
];
