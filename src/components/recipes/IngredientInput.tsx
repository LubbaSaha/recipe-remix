import Input from "@/components/ui/Input";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function IngredientInput({ value, onChange }: Props) {
  return (
    <div>
      <label
        htmlFor="ingredients"
        className="block mb-[var(--space-2)] font-medium text-[var(--color-neutral-foreground)]"
      >
        Ingredients
      </label>
      <Input
        id="ingredients"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter ingredients (comma separated)"
      />
    </div>
  );
}
