export function Input({ type, value, onChange, placeholder, className }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-400 ${className}`}
    />
  );
}
