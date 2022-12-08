import React, { useState } from "react";
import Button from "../../../../common/components/inputs/button/button";
import Note from "../note/note";
import { NoteId, NoteDetails, NoteModel } from "../../types/note";
import * as Styles from "./noteList.style";
import * as CommonStyles from "../../../../common/styles/styles";

export enum NotesFilter {
	All = "all",
	Active = "active",
	Completed = "completed",
}

interface NotesListProps {
	onNoteUpdated: (
		updatedNoteId: NoteId,
		updatedNoteDetails: Partial<NoteDetails>,
	) => void;
	onRemoveNotes: (noteIds: NoteId[]) => void;
	notes: NoteModel[];
}

export const classNames = {
	notesList: "notes-list",
	notesManagement: "notes-management",
	notesInfo: "notes-info",
	notesFilterButtons: "notes-filter-buttons",
	clearCompletedNotesButton: "clear-completed-notes-button",
};

export function NotesList({
	notes,
	onNoteUpdated,
	onRemoveNotes,
}: NotesListProps): JSX.Element {
	const [activeFilter, setActiveFilter] = useState(NotesFilter.All);

	const getFilteredNotes = (
		activeFilter: NotesFilter,
		notes: NoteModel[],
	) => {
		return notes.filter(note => {
			if (
				(activeFilter === NotesFilter.Active && note.isComplete) ||
				(activeFilter === NotesFilter.Completed && !note.isComplete)
			) {
				return false;
			}

			return true;
		});
	};

	const onClearCompletedNotes = () => {
		const completedNotes = notes.filter(note => note.isComplete);
		onRemoveNotes(completedNotes.map(note => note.id));
	};

	const getFilterButtons = (activeFilter: NotesFilter): React.ReactNode => {
		return Object.entries(NotesFilter).map(
			([filterEnumKey, filterEnumValue]) => {
				return (
					<Styles.NotesFilterButton
						key={filterEnumValue}
						className={filterEnumValue}
					>
						<Button
							isSelected={activeFilter === filterEnumValue}
							onClick={() => setActiveFilter(filterEnumValue)}
						>
							{filterEnumKey}
						</Button>
					</Styles.NotesFilterButton>
				);
			},
		);
	};

	const filteredNotes = getFilteredNotes(activeFilter, notes);

	const completedNotesLength = notes.filter(note => !note.isComplete).length;

	return (
		<Styles.NotesList className={classNames.notesList}>
			<CommonStyles.List role={"list"}>
				<CommonStyles.ListItem role={"listitem"}>
					{filteredNotes.map(note => (
						<Note
							key={note.id}
							note={note}
							onNoteUpdated={onNoteUpdated}
							onRemoveNote={noteId => onRemoveNotes([noteId])}
						/>
					))}
				</CommonStyles.ListItem>
			</CommonStyles.List>
			{notes.length > 0 && (
				<Styles.NotesManagement className={classNames.notesManagement}>
					<Styles.NotesInfo className={classNames.notesInfo}>
						{completedNotesLength} item
						{completedNotesLength === 1 ? "" : "s"} left
					</Styles.NotesInfo>
					<Styles.NotesFilterButtons
						className={classNames.notesFilterButtons}
					>
						{getFilterButtons(activeFilter)}
					</Styles.NotesFilterButtons>
					<Styles.ClearCompletedNotesButton
						className={classNames.clearCompletedNotesButton}
					>
						{notes.filter(note => note.isComplete).length !== 0 && (
							<Button onClick={onClearCompletedNotes}>
								Clear completed
							</Button>
						)}
					</Styles.ClearCompletedNotesButton>
				</Styles.NotesManagement>
			)}
		</Styles.NotesList>
	);
}

export default NotesList;
