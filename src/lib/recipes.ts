import {  mockRecipes} from "@/data/mockRecipes";

export async function getAllRecipes() {
    return mockRecipes;
}

export async function getRecipeById(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    return mockRecipes.find((r) => r.id === id) || null;
}