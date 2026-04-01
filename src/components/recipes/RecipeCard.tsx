import { ScoredRecipe } from "@/types/recipe";
import Link from "next/link";
import { useState } from "react";

type Props = {
  recipe: ScoredRecipe;
  vectorMode: boolean;
};

export default function RecipeCard({ recipe, vectorMode }: Props) {
  const [showAll, setShowAll] = useState(false);
  const matchPercentage =
    recipe.totalQueryCount > 0
      ? (recipe.matchCount / recipe.totalQueryCount) * 100
      : 0;
  const progressValue = vectorMode
    ? Math.min(100, Math.round(recipe.matchCount * 100))
    : Math.min(100, matchPercentage);

  const visibleIngredients = showAll
    ? recipe.ingredients
    : recipe.ingredients.slice(0, 5);

  const hiddenCount = recipe.ingredients.length - visibleIngredients.length;

  return (
    <Link href={`/recipes/${recipe.id}`} className="block">
      <div className="p-[var(--space-4)] transition-shadow rounded-[var(--radius-card)] bg-[var(--color-tertiary)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]">
        <h2 className="text-lg font-semibold">{recipe.title}</h2>
        <p className="text-[var(--color-neutral-foreground)]">{recipe.description}</p>

        {vectorMode && recipe.totalQueryCount > 0 ? (
          <progress
            className="w-full mt-2 h-2 progress-primary"
            max={100}
            value={progressValue}
          />
        ) : (
          recipe.totalQueryCount > 0 && (
            <progress
              className="w-full mt-2 h-2 progress-secondary"
              max={100}
              value={progressValue}
            />
          )
        )}

        {recipe.totalQueryCount > 0 ? (
          <div>
            <div className="mt-2 text-xs">
              {vectorMode ? "Semantic Match:" : "Match Score:"}{" "}
              <span className="font-semibold">
                {vectorMode
                  ? `${Math.round(recipe.matchCount * 100)}%`
                  : recipe.matchCount}
              </span>
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
                        ? "font-semibold text-[var(--color-primary)]"
                        : "text-[var(--color-neutral-foreground)]"
                    }
                  >
                    {ingredient}
                  </li>
                );
              })}

              {hiddenCount > 0 && !showAll && (
                <button
                  type="button"
                  className="mt-1 text-xs text-[var(--color-secondary)] hover:underline"
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
