type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function IngredientInput({ value, onChange }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter ingredients (comma separated)"
      className="w-full p-2 border rounded"
    />
  );
}
