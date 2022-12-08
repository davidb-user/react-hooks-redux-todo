import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	createNoteId,
	NoteModel,
	NoteDetails,
} from "../features/todos/types/note";

export interface SliceState {
	notes: Record<string, NoteModel>;
	noteIdsOrder: string[];
}

export const initialState: SliceState = {
	notes: {},
	noteIdsOrder: [],
};

export const notesSlice = createSlice({
	name: "notesSlice",
	initialState,
	reducers: {
		addNote: (state, action: PayloadAction<{ noteContent: string }>) => {
			const newNote: NoteModel = {
				id: createNoteId(),
				content: action.payload.noteContent,
				isComplete: false,
			};
			state.notes[newNote.id] = newNote;
			state.noteIdsOrder.push(newNote.id);
		},
		removeNotes: (
			state,
			action: PayloadAction<{ noteIdsToRemove: string[] }>,
		) => {
			action.payload.noteIdsToRemove.forEach(noteId => {
				delete state.notes[noteId];
			});
			state.noteIdsOrder = state.noteIdsOrder.filter(noteId => {
				return !action.payload.noteIdsToRemove.includes(noteId);
			});
		},
		updateNote: (
			state,
			action: PayloadAction<{
				noteId: string;
				newNoteDetails: Partial<NoteDetails>;
			}>,
		) => {
			const noteId = action.payload.noteId;
			const note = state.notes[noteId];
			Object.assign(note, action.payload.newNoteDetails);
		},
		setAllNotesCompleteState: (
			state,
			action: PayloadAction<{ newIsCompleteStatus: boolean }>,
		) => {
			Object.values(state.notes).forEach(note => {
				note.isComplete = action.payload.newIsCompleteStatus;
			});
		},
	},
});

export const { addNote, removeNotes, updateNote, setAllNotesCompleteState } =
	notesSlice.actions;

export default notesSlice.reducer;
