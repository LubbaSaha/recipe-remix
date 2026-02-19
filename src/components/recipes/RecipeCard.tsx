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
          <div>
            <div className="mt-3 text-sm">
              <p className="text-green-600">
                Matched: {recipe.matchedIngredients.join(", ") || "None"}
              </p>

              {recipe.missingIngredients.length > 0 && (
                <p className="text-gray-400">
                  Missing: {recipe.missingIngredients.join(", ")}
                </p>
              )}
            </div>

            <div className="mt-2 text-xs font-semibold">
              Match Score: {recipe.matchCount}
            </div>
          </div>
          // <div className="mt-2 space-y-2">
          //   <div className="text-sm text-emerald-600">
          //     Matches{" "}
          //     <span className="font-semibold text-Green-600">
          //       {recipe.matchCount}
          //     </span>{" "}
          //     of {recipe.totalQueryCount} ingredients
          //   </div>

          //   <div className="flex flex-wrap gap-2">
          //     {recipe.matchedIngredients.map((ingredient) => (
          //       <span
          //         key={ingredient}
          //         className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded"
          //       >
          //         {ingredient}
          //       </span>
          //     ))}
          //   </div>
          // </div>
        )}
      </div>
    </Link>
  );
}
