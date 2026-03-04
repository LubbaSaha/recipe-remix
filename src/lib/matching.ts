export function parseQuery(query: string): string[] {
  return query
    .split(",")
    .map((item) => item.trim().toLocaleLowerCase())
    .filter(Boolean);
}

export function getMatchedIngredients(
  recipeIngredients: string[],
  queryIngredients: string[]
): string[] {
  return recipeIngredients.filter((ingredient) =>
    queryIngredients.some((query) =>
      ingredient.toLowerCase().includes(query.toLowerCase())
    )
  );
}
