import styled from "styled-components";

export const TextInputWrapper = styled.div`
	display: flex;
	flex-grow: 1;
`;

interface TextInputProps {
	addBorderOnFocus?: boolean;
}

export const TextInput = styled.input<TextInputProps>`
	background: none;
	flex-grow: 1;
	font-size: inherit;
	font-family: cursive;
	outline: none;
	appearance: none;
	border: none;
	padding: 18px;
	margin: 0 10px;

	&[disabled] {
		background: none;
		color: black;
	}

	&::placeholder {
		font-style: italic;
		font-weight: 100;
		font-size: 1em;
		color: var(--border-grey);
	}

	${props =>
		props.addBorderOnFocus &&
		`&:focus {
		border: solid var(--border-grey) 1px;
		box-shadow: inset 0px 0px 5px 1px var(--border-grey);
	}`}
`;
