import styled from "styled-components";

export const CheckboxWrapper = styled.div`
	position: relative;
`;

export const Checkbox = styled.input`
	position: relative;
	width: 3em;
	height: 3em;
	top: 50%;
	left: 50%;
	transform: translate(-52%, -60%);
	border-radius: 50%;
	vertical-align: middle;
	border: 1px solid #535353;
	appearance: none;
	cursor: pointer;
`;

export const Checkmark = styled.span`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-35%, -48%);
	font-size: 1.7em;
	font-family: emoji;
	color: transparent;
	text-shadow: 0 0 0 #2c952c;
	cursor: pointer;
	pointer-events: none;
	user-select: none;
	font-size: inherit;
	font-family: inherit;
`;
