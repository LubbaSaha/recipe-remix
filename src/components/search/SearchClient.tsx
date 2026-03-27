"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import IngredientInput from "@/components/recipes/IngredientInput";
import RecipeList from "@/components/recipes/RecipeList";
import { useRecipes } from "@/hooks/useRecipes";
import { useDebounce } from "@/hooks/useDebounce";
import { useVectorRecipe } from "@/hooks/useVectorRecipes";

export default function SearchClient() {
  const searchParams = useSearchParams()!;
  const pathname = usePathname();

  const [input, setInput] = useState(searchParams.get("ingredients") ?? "");

  const [showFullMatchOnly, setShowFullMatchOnly] = useState(
    searchParams.get("fullMatch") === "true"
  );

  const debouncedQuery = useDebounce(input, 300);

  const [isAdvanced, setIsAdvanced] = useState(false);

  const regularRecipes = useRecipes(debouncedQuery, showFullMatchOnly);
  const vectorRecipes = useVectorRecipe(debouncedQuery);

  // Update URL when debouncedQuery or toggle changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debouncedQuery) params.set("ingredients", debouncedQuery);
    else params.delete("ingredients");

    if (showFullMatchOnly) params.set("fullMatch", "true");
    else params.delete("fullMatch");

    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  }, [debouncedQuery, showFullMatchOnly, pathname]);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <IngredientInput value={input} onChange={setInput} />

      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isAdvanced}
            onChange={(e) => setIsAdvanced(e.target.checked)}
            className="accent-[var(--color-primary)]"
          />
          <label className="text-sm text-[var(--color-neutral-foreground)]">
            Use Advanced (Vector) Search
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showFullMatchOnly}
            onChange={(e) => setShowFullMatchOnly(e.target.checked)}
            className="accent-[var(--color-primary)]"
          />
          <label className="text-sm text-[var(--color-neutral-foreground)]">
            Show only full matches
          </label>
        </div>
      </div>

      {isAdvanced ? (
        <span className="text-xs text-[var(--color-secondary)]">Semantic Match</span>
      ) : (
        <span className="text-xs text-[var(--color-neutral-foreground)]">Ingredient Match</span>
      )}

      <RecipeList
        recipes={isAdvanced ? vectorRecipes : regularRecipes}
        vectorMode={isAdvanced}
      />
    </div>
  );
}
