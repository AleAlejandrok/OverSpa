interface CheckboxSingleParams<T> {
  onChange: (value: T) => void;
  disabled?: boolean;
  className?: string;
  options: T[];
  selection?: string,
  id: string,
}

export default function CheckboxSingle<T extends string | number>({
  onChange,
  disabled = false,
  className = "",
  options = [],
  selection,
  id
}: CheckboxSingleParams<T>) {

  return (
	<select
	  className={`CheckboxSingle-${className}`}
	  disabled={disabled}
	  onChange={(e) => onChange(e.target.value as T)}
	  defaultValue={options.find(option => option === selection) ?? ""}
	  id={`dropdown-${id}`}
	>
	  {options.map((option) => (
		<option key={String(option)} value={option} id={`dropdown-option-${option}-${id}`}>
		  {option}
		</option>
	  ))}
	<option value="" disabled></option>
	</select>
  );
}