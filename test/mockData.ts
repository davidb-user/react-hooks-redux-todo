import { createNoteId, Note } from "../src/models/note";

export const generateNote = ({
	isComplete,
	content,
}: Partial<Note> = {}): Note => ({ id: createNoteId(), content, isComplete });

function generateNotesList(length: number): Note[] {
	return Array.from({ length }, generateNote);
}

export const noteMock: Note = generateNote();
export const notesMock: Note[] = generateNotesList(3);
