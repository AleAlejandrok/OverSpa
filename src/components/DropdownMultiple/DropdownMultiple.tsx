interface CheckboxGroupParams<T> {
	onChange: (values: T[]) => void
	disabled?: boolean
	className?: string
	selections?: T[]
	options: T[]
}

export default function CheckBoxMultiple<T extends string | number>({
	onChange,
	disabled = false,
	className = "",
	options = [],
	selections = [],
}: CheckboxGroupParams<T>) {

	const handleToggle = (option: T) => {
		const isSelected = selections.includes(option);
		if (isSelected) {
			onChange(selections.filter((item) => item !== option));
		} else {
			onChange([...selections, option]);
		}
	};
	
	return (
		<div className={`checkbox-${className}`}>
			{options.map((option) => {
				option = option
				const id = `checkbox-${className}-${String(option).replace(' ', '-')}`;
				const isChecked = selections.includes(option);

				return (
					<div key={String(option)} className="checkbox-item">
						<input
							type="checkbox"
							id={id}
							checked={isChecked}
							disabled={disabled}
							onChange={() => handleToggle(option)}
						/>
						<label htmlFor={id}>
							{option}
						</label>
					</div>
				);
			})}
		</div>
	);
}