import { ScoredRecipe } from "@/types/recipe";
import Link from "next/link";

type Props = {
  recipe: ScoredRecipe;
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block">
      <div className="p-4 transition bg-white rounded shadow hover:shadow-md">
        <h2 className="text-lg font-semibold">{recipe.title}</h2>
        <p className="text-gray-600">{recipe.description}</p>

        {recipe.totalQueryCount > 0 && (
          <div className="mt-2 space-y-2">
            <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">
              Matches {recipe.matchCount} of {recipe.totalQueryCount}
            </span>

            <div className="flex flex-wrap gap-2">
              {recipe.matchedIngredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}