export type NoteId = string;

export function createNoteId(): NoteId {
	return "id" + Math.random().toString(16).slice(2);
}

export interface NoteDetails {
	content: string;
	isComplete: boolean;
}

export interface NoteModel extends NoteDetails {
	id: NoteId;
}
