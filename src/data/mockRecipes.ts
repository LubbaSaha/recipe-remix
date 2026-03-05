import { Recipe } from "@/types/recipe";

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Tomato Pasta",
    description: "Simple pasta with tomato sauce",
    ingredients: ["tomato", "pasta", "salt", "Olive oil", "Garlic", "Parsley"],
    vector: [0.1, 0.2, 0.3], // Example embedding vector
  },

  {
    id: "2",
    title: "Egg Fried Rice",
    description: "Quick fried rice with eggs",
    ingredients: ["rice", "egg", "salt"],
    vector: [], // Example embedding vector
  },
];
