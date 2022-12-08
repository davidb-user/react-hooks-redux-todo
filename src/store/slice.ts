import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createNoteId, Note, NoteDetails } from "../models/note";

interface SliceState {
	notes: Note[];
}

const initialState: SliceState = {
	notes: [],
};

export const slice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		addNote: (state, action: PayloadAction<{ noteContent: string }>) => {
			const newNote: Note = {
				id: createNoteId(),
				content: action.payload.noteContent,
				isComplete: false,
			};
			state.notes.push({ ...newNote });
		},
		removeNotes: (
			state,
			action: PayloadAction<{ noteIdsToRemove: string[] }>,
		) => {
			state.notes = state.notes.filter(note => {
				return !action.payload.noteIdsToRemove.includes(note.id);
			});
		},
		updateNote: (
			state,
			action: PayloadAction<{
				noteId: string;
				newNoteDetails: Partial<NoteDetails>;
			}>,
		) => {
			state.notes = state.notes.map(note => {
				return note.id === action.payload.noteId
					? { ...note, ...action.payload.newNoteDetails }
					: note;
			});
		},
		setAllNotesCompleteState: (
			state,
			action: PayloadAction<{ newIsCompleteStatus: boolean }>,
		) => {
			state.notes = state.notes.map(note => {
				return {
					...note,
					isComplete: action.payload.newIsCompleteStatus,
				};
			});
		},
	},
});

export const { addNote, removeNotes, updateNote, setAllNotesCompleteState } =
	slice.actions;

export default slice.reducer;
