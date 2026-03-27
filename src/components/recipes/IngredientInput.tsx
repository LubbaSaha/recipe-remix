type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function IngredientInput({ value, onChange }: Props) {
  return (
    <div>
      <label
        htmlFor="ingredients"
        className="block mb-2 font-medium text-[var(--color-neutral-foreground)]"
      >
        Ingredients
      </label>
      <input
        id="ingredients"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter ingredients (comma separated)"
        className="w-full p-2 rounded border border-[var(--color-neutral-border)] bg-[var(--color-neutral)] text-[var(--color-neutral-foreground)] placeholder:text-[var(--color-neutral-foreground)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
      />
    </div>
  );
}
