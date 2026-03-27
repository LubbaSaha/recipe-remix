import { getRecipeById } from "@/lib/recipes";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RecipeDetailPage({ params }: Props) {
  const { id } = await params;

  const recipe = await getRecipeById(id);

  if (!recipe) return notFound();

  return (
    <div className="min-h-screen py-10 bg-[var(--color-neutral)]">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-4 text-sm text-[var(--color-secondary)] hover:underline"
        >
          ← Back to recipes
        </Link>
      </div>

      <div className="max-w-3xl p-8 mx-auto rounded-lg shadow-md bg-[var(--color-tertiary)]">
        <h1 className="mb-2 text-3xl font-bold">{recipe.title}</h1>
        <p className="mb-6 text-[var(--color-neutral-foreground)]">{recipe.description}</p>

        <hr className="mb-6 border-[var(--color-neutral-border)]" />

        <h2 className="mb-4 text-xl font-semibold">Ingredients</h2>

        <ul className="grid grid-cols-2 gap-3">
          {recipe.ingredients.map((ingredient) => (
            <li
              key={ingredient}
              className="px-3 py-2 text-sm rounded bg-[var(--color-neutral)]"
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}