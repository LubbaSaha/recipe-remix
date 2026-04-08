import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import TextLink from "@/components/ui/TextLink";
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
    <div className="min-h-screen py-[var(--space-10)] bg-[var(--color-neutral)]">
      <div className="max-w-3xl mx-auto">
        <TextLink href="/" className="mb-[var(--space-4)] inline-block">
          ← Back to recipes
        </TextLink>
      </div>

      <Card variant="panel" className="max-w-3xl mx-auto p-[var(--space-8)]">
        <h1 className="type-h2 mb-2">{recipe.title}</h1>
        <p className="type-body text-[var(--color-neutral-foreground)] mb-6">
          {recipe.description}
        </p>

        <hr className="mb-6 border-[var(--color-neutral-border)]" />

        <h2 className="type-h4 mb-4">Ingredients</h2>

        <ul className="grid grid-cols-2 gap-[var(--space-3)]">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>
              <Chip>{ingredient}</Chip>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}