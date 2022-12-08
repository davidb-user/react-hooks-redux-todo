import React from "react";
import * as Styles from "./button.style";

interface ButtonProps extends React.PropsWithChildren {
	isSelected?: boolean;
	onClick(): void;
}

export function Button({
	onClick,
	children,
	isSelected,
}: ButtonProps): JSX.Element {
	return (
		<Styles.Button isSelected={isSelected} onClick={onClick}>
			{children}
		</Styles.Button>
	);
}

export default Button;
