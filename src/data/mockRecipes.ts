import { Recipe } from "@/types/recipe";

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Tomato Pasta",
    description: "Classic Italian pasta",
    ingredients: ["pasta", "tomato", "garlic", "salt"],
    embedding: [0.0476, 0.043, 0.0512, 0.0505, 0.0424, 0.0377], // mostly Italian
  },
  {
    id: "2",
    title: "Garlic Noodles",
    description: "Asian style noodles",
    ingredients: ["noodles", "garlic", "soy sauce"],
    embedding: [0.0548, 0.0508, 0.0078, 0.0534, 0.023, 0.0478], // mostly Asian
  },
  {
    id: "3",
    title: "Chocolate Cake",
    description: "Rich chocolate dessert",
    ingredients: ["flour", "cocoa", "sugar"],
    embedding: [0.0429, 0.055, 0.0555, 0.0506, 0.0129, 0.0523], // sweet
  },
];
