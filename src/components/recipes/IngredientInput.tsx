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
      <input
        id="ingredients"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter ingredients (comma separated)"
        className="w-full px-[var(--space-3)] py-[var(--space-2)] rounded-[var(--radius-control)] border border-[var(--color-neutral-border)] bg-[var(--color-neutral)] text-[var(--color-neutral-foreground)] placeholder:text-[var(--color-neutral-foreground)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
      />
    </div>
  );
}
