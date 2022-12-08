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
import "./app.css";
import NotesList from "../features/todos/notesList/notesList";

export const classNames = {
	app: "app",
	manageNotes: "manage-notes",
	toggleCompleteAllNotes: "toggle-complete-all-notes",
	createNoteContentInput: "create-note-content-input",
	appWrapper: "app-wrapper",
};

export function App(): JSX.Element {
	const notes = useAppSelector(state => state.notes);
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
		<div className={classNames.appWrapper}>
			<div className={classNames.app}>
				<h1>TODOS</h1>
				<div className={classNames.manageNotes}>
					{notes.length > 0 && (
						<div className={classNames.toggleCompleteAllNotes}>
							<Checkbox
								isChecked={
									notes.length &&
									notes.every(note => note.isComplete)
								}
								onChange={onToggleCompleteAllChange}
							/>
						</div>
					)}
					<div className={classNames.createNoteContentInput}>
						<Textbox
							defaultValue=""
							onSubmit={onSubmitNewNote}
							clearValueAfterSubmit={true}
							placeholderText={"Describe here the task to do..."}
						/>
					</div>
				</div>
				<NotesList
					notes={notes}
					onNoteUpdated={onNoteUpdated}
					onRemoveNotes={onRemoveNotes}
				/>
			</div>
		</div>
	);
}

export default App;
