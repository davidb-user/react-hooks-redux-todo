import React from "react";
import * as Styles from "./checkbox.style";

interface CheckboxProps {
	isChecked: boolean;

	onChange(newValue: boolean): void;
}

export function Checkbox(props: CheckboxProps): JSX.Element {
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange(event.target.checked);
	};

	const { isChecked } = props;
	return (
		<Styles.CheckboxWrapper className="checkbox-wrapper">
			<Styles.Checkbox
				type={"checkbox"}
				className="checkbox"
				checked={isChecked}
				onChange={onChange}
			/>
			{isChecked === true && (
				<Styles.Checkmark className="checkmark">✔️</Styles.Checkmark>
			)}
		</Styles.CheckboxWrapper>
	);
}

export default Checkbox;
