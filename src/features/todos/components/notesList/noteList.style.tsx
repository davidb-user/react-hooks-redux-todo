import styled from "styled-components";

export const NotesList = styled.div``;

export const NotesInfo = styled.div`
	display: flex;
	align-items: center;
`;

export const NotesManagement = styled.div`
	padding: 10px 30px;
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	font-size: 0.75em;
	background-color: var(--notebook-background);
	border: 1px solid var(--notebook-line);
	margin-bottom: 15px;
	border-radius: 40px;
	margin-top: 12px;
`;

export const NotesFilterButtons = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const NotesFilterButton = styled.div`
	&:not(:last-child) {
		margin-right: 10px;
	}
`;

export const ClearCompletedNotesButton = styled.div`
	text-align: right;
`;
