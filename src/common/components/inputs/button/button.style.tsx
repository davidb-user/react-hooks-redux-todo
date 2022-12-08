import styled from "styled-components";

interface ButtonProps {
	isSelected?: boolean;
}

export const Button = styled.button<ButtonProps>`
	font-size: inherit;
	font-family: inherit;
	appearance: none;
	border: none;
	background: none;
	user-select: none;
	padding: 4px 8px;
	border-radius: 4px;

	${props =>
		props.isSelected
			? `	border: 1px solid pink;`
			: `&:hover {
			border: 1px solid lightpink;
		}`}
`;
