import { NoteDetails } from "../features/todos/types/note";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import {
	addNote,
	removeNotes,
	setAllNotesCompleteState,
	updateNote,
} from "./notesSlice";
import Checkbox from "../common/components/inputs/checkbox/checkbox";
import Textbox from "../common/components/inputs/textbox/textbox";
import NotesList from "../features/todos/components/notesList/notesList";
import * as Styles from "./app.style";
import * as CommonStyles from "../common/styles/styles";

export const classNames = {
	app: "app",
	manageNotes: "manage-notes",
	appWrapper: "app-wrapper",
};

export function App(): JSX.Element {
	const notes = useAppSelector(state =>
		state.noteIdsOrder.map(noteId => state.notes[noteId]),
	);
	const dispatch = useAppDispatch();

	function onNoteUpdated(
		updatedNoteId: string,
		updatedNoteDetails: Partial<NoteDetails>,
	) {
		if (updatedNoteDetails.content === "") {
			onRemoveNotes([updatedNoteId]);
		} else {
			dispatch(
				updateNote({
					noteId: updatedNoteId,
					newNoteDetails: updatedNoteDetails,
				}),
			);
		}
	}

	function onRemoveNotes(noteIdsToRemove: string[]) {
		dispatch(removeNotes({ noteIdsToRemove }));
	}

	function onSubmitNewNote(noteContent: string) {
		if (noteContent === "") {
			return;
		}

		dispatch(addNote({ noteContent }));
	}

	function onToggleCompleteAllChange() {
		const areAllNotesComplete =
			notes.length && notes.every(note => note.isComplete);

		dispatch(
			setAllNotesCompleteState({
				newIsCompleteStatus: !areAllNotesComplete,
			}),
		);
	}

	return (
		<Styles.AppWrapper className={classNames.appWrapper}>
			<Styles.App className={classNames.app}>
				<Styles.AppTitle>TODOS</Styles.AppTitle>
				<CommonStyles.FlexWrapper className={classNames.manageNotes}>
					{notes.length > 0 && (
						<Checkbox
							isChecked={
								notes.length &&
								notes.every(note => note.isComplete)
							}
							onChange={onToggleCompleteAllChange}
						/>
					)}
					<Textbox
						defaultValue=""
						onSubmit={onSubmitNewNote}
						clearValueAfterSubmit={true}
						placeholderText={"Describe here the task to do..."}
					/>
				</CommonStyles.FlexWrapper>
				<NotesList
					notes={notes}
					onNoteUpdated={onNoteUpdated}
					onRemoveNotes={onRemoveNotes}
				/>
			</Styles.App>
		</Styles.AppWrapper>
	);
}

export default App;
