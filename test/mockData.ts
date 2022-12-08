import { createNoteId, NoteModel } from "../src/features/todos/types/note";

export const generateNote = ({
	isComplete,
	content,
}: Partial<NoteModel> = {}): NoteModel => ({
	id: createNoteId(),
	content,
	isComplete,
});

function generateNotesList(length: number): NoteModel[] {
	return Array.from({ length }, generateNote);
}

export const noteMock: NoteModel = generateNote();
export const notesMock: NoteModel[] = generateNotesList(3);
