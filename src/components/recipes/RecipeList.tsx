import { ScoredRecipe } from "@/types/recipe";
import RecipeCard from "./RecipeCard";

type Props = {
  recipes: ScoredRecipe[];
  vectorMode: boolean;
};

export default function RecipeList({ recipes, vectorMode }: Props) {
  return (
    <div className="grid gap-4 mt-4">
      {recipes.length === 0 && (
        <p className="mt-4 text-[var(--color-neutral-foreground)]">No recipes found</p>
      )}
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} vectorMode={vectorMode} />
      ))}
    </div>
  );
}
