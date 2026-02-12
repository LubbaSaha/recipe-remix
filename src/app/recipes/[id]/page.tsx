import { getRecipeById } from "@/lib/recipes";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RecipeDetailPage({ params }: Props) {

  const { id } = await params;
  
  const recipe = await getRecipeById(id);

  if (!recipe) return notFound();

  return (
    <div className="min-h-screen py-10 bg-gray-50">
      <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-md">
        <h1 className="mb-2 text-3xl font-bold">{recipe.title}</h1>
        <p className="mb-6 text-gray-600">{recipe.description}</p>

        <hr className="mb-6" />

        <h2 className="mb-4 text-xl font-semibold">Ingredients</h2>

        <ul className="grid grid-cols-2 gap-3">
          {recipe.ingredients.map((ingredient) => (
            <li
              key={ingredient}
              className="px-3 py-2 text-sm bg-gray-100 rounded"
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
