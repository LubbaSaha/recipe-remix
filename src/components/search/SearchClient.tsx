"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import IngredientInput from "@/components/recipes/IngredientInput";
import RecipeList from "@/components/recipes/RecipeList";
import { useRecipes } from "@/hooks/useRecipes";

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const pathname = usePathname();

  const query = searchParams.get("ingredients") ?? "";
  const recipes = useRecipes(query);

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("ingredients", value);
    else params.delete("ingredients");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <IngredientInput value={query} onChange={handleChange} />
      <RecipeList recipes={recipes} />
    </div>
  );
}