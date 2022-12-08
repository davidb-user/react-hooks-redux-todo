import React from "react";
import { NoteModel as NoteModel, NoteId, NoteDetails } from "../../types/note";
import Button from "../../../../common/components/inputs/button/button";
import Checkbox from "../../../../common/components/inputs/checkbox/checkbox";
import Textbox from "../../../../common/components/inputs/textbox/textbox";
import * as Styles from "./note.style";

interface NoteProps {
	onNoteUpdated: (
		updatedNoteId: NoteId,
		updatedNoteDetails: Partial<NoteDetails>,
	) => void;
	onRemoveNote: (noteId: NoteId) => void;
	note: NoteModel;
}

export const classNames = {
	note: "note",
};

export function Note(props: NoteProps): JSX.Element {
	const { note } = props;

	const onCompleteStatusChange = (newValue: boolean) => {
		const updatedNoteDetails: Partial<NoteDetails> = {
			isComplete: newValue,
		};
		props.onNoteUpdated(note.id, updatedNoteDetails);
	};

	const onNoteContentChange = (noteContent: NoteModel["content"]) => {
		const updatedNoteDetails: Partial<NoteDetails> = {
			content: noteContent,
		};
		props.onNoteUpdated(note.id, updatedNoteDetails);
	};

	const onRemoveNote = () => {
		props.onRemoveNote(note.id);
	};

	return (
		<Styles.Note className={classNames.note}>
			<Checkbox
				isChecked={note.isComplete}
				onChange={onCompleteStatusChange}
			/>
			<Textbox
				defaultValue={note.content}
				doubleClickToEdit={true}
				onSubmit={onNoteContentChange}
			/>
			<Button onClick={onRemoveNote}>🗑</Button>
		</Styles.Note>
	);
}

export default Note;
