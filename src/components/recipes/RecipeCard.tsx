import { Recipe } from "@/types/recipe";
import Link from "next/link";

type Props = {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
    return (
        <Link href={`/recipes/${recipe.id}`}>
            <div className="p-4 transition-shadow border rounded hover:shadow-lg">
                <h3 className="text-lg font-semibold">{recipe.title}</h3>
                <p className="text-sm text-gray-600">{recipe.description}</p>
            </div>
        </Link>
    );
}