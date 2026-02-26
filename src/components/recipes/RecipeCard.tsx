import { ScoredRecipe } from "@/types/recipe";
import Link from "next/link";

type Props = {
  recipe: ScoredRecipe;
};

export default function RecipeCard({ recipe }: Props) {
  const displayedIngredients = recipe.ingredients.slice(0, 5);

  console.log(displayedIngredients);

  return (
    <Link href={`/recipes/${recipe.id}`} className="block">
      <div className="p-4 transition bg-white rounded shadow hover:shadow-md">
        <h2 className="text-lg font-semibold">{recipe.title}</h2>
        <p className="text-gray-600">{recipe.description}</p>

        {recipe.totalQueryCount > 0 && (
          <div className="mt-2 text-xs font-semibold">
            Match Score: {recipe.matchCount}
          </div>
        )}

        <ul className="mt-2 list-disc list-inside text-sm grid grid-flow-col grid-rows-3">
          {recipe.ingredients.slice(0, 5).map((ingredient) => {
            const isMatched = recipe.matchedIngredients.some((matched) =>
              ingredient.toLowerCase().includes(matched)
            );

            return (
              <li
                key={ingredient}
                className={isMatched ? "text-green-600 font-semibold" : ""}
              >
                {ingredient}
              </li>
            );
          })}
          {recipe.ingredients.length > 5 && (
            <p className="text-xs text-gray-400 mt-1">
              +{recipe.ingredients.length - 5} more
            </p>
          )}
        </ul>
      </div>
    </Link>
  );
}
