import { Recipe } from "@/types/recipe";

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Tomato Pasta",
    description: "Classic Italian pasta",
    ingredients: ["pasta", "tomato", "garlic", "salt"],
    embedding: [0.9, 0.1, 0.0], // mostly Italian
  },
  {
    id: "2",
    title: "Garlic Noodles",
    description: "Asian style noodles",
    ingredients: ["noodles", "garlic", "soy sauce"],
    embedding: [0.1, 0.9, 0.0], // mostly Asian
  },
  {
    id: "3",
    title: "Chocolate Cake",
    description: "Rich chocolate dessert",
    ingredients: ["flour", "cocoa", "sugar"],
    embedding: [0.0, 0.6, 1.0], // sweet
  },
];
