import { ScoredRecipe } from "@/types/recipe";
import Link from "next/link";
import { useState } from "react";

type Props = {
  recipe: ScoredRecipe;
  vectorMode?: boolean;
};

export default function RecipeCard({ recipe, vectorMode }: Props) {
  console.log(recipe, "recipe in card");

  const [showAll, setShowAll] = useState(false);
  const matchPercentage =
    recipe.totalQueryCount > 0
      ? (recipe.matchCount / recipe.totalQueryCount) * 100
      : 0;

  const visibleIngredients = showAll
    ? recipe.ingredients
    : recipe.ingredients.slice(0, 5);

  const hiddenCount = recipe.ingredients.length - visibleIngredients.length;

  return (
    <Link href={`/recipes/${recipe.id}`} className="block">
      <div className="p-4 transition bg-white rounded shadow hover:shadow-md">
        <h2 className="text-lg font-semibold">{recipe.title}</h2>
        <p className="text-gray-600">{recipe.description}</p>

        {vectorMode && recipe.totalQueryCount > 0 ? (
          // Vector search - progress bar
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all
                  ${
                    matchPercentage >= 100
                      ? "bg-green-600"
                      : matchPercentage >= 50
                      ? "bg-yellow-500"
                      : "bg-red-600"
                  }`}
              style={{
                width: `${matchPercentage >= 100 ? 100 : matchPercentage}%`,
              }}
            />
          </div>
        ) : (
          // Regular search - progress bar
          recipe.totalQueryCount > 0 && (
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all
                  ${
                    matchPercentage >= 100
                      ? "bg-green-600"
                      : matchPercentage >= 50
                      ? "bg-yellow-500"
                      : "bg-red-600"
                  }`}
                style={{
                  width: `${matchPercentage >= 100 ? 100 : matchPercentage}%`,
                }}
              />
            </div>
          )
        )}

        {recipe.totalQueryCount > 0 ? (
          <div>
            <div className="mt-2 text-xs">
              Match Score:{" "}
              <span className="font-semibold">{recipe.matchCount}</span>
            </div>

            <ul className="mt-2 list-disc list-inside text-sm grid grid-flow-col grid-rows-3">
              {visibleIngredients.map((ingredient) => {
                const isMatched =
                  recipe.matchedIngredients.includes(ingredient);

                return (
                  <li
                    key={ingredient}
                    className={
                      isMatched
                        ? "font-semibold text-green-700"
                        : "text-gray-500"
                    }
                  >
                    {ingredient}
                  </li>
                );
              })}

              {hiddenCount > 0 && !showAll && (
                <button
                  type="button"
                  className="mt-1 text-xs text-blue-600 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAll(true);
                  }}
                >
                  +{hiddenCount} more
                </button>
              )}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}
