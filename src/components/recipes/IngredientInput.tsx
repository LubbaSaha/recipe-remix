type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function IngredientInput({ value, onChange }: Props) {

  return (
    <div>
      
      <label htmlFor="ingredients" className="block mb-2 font-medium text-gray-700">
        Ingredients
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter ingredients (comma separated)"
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
