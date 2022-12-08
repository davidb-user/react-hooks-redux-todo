import { generateNote, notesMock } from "../../test/mockData";
import { NoteModel } from "../features/todos/types/note";
import reducer, {
	addNote,
	removeNotes,
	setAllNotesCompleteState,
	SliceState,
	updateNote,
} from "./notesSlice";

describe("notesSlice", () => {
	describe("actions", () => {
		describe("addNote", () => {
			describe("no notes available at state", () => {
				it("should add a note", () => {
					const previousState: SliceState = {
						noteIdsOrder: [],
						notes: {},
					};
					const noteContent = "noteContent";

					const state = reducer(
						previousState,
						addNote({ noteContent: noteContent }),
					);

					expect(state.noteIdsOrder).toHaveLength(1);
					const noteId = state.noteIdsOrder[0];
					expect(state.notes[noteId]).toEqual<NoteModel>({
						id: noteId,
						content: noteContent,
						isComplete: false,
					});
				});
			});

			describe("notes already available at state", () => {
				it("should add a note after previous notes", () => {
					const previousState: SliceState = {
						noteIdsOrder: notesMock.map(note => note.id),
						notes: notesMock.reduce((acc, note) => {
							acc[note.id] = note;
							return acc;
						}, {} as SliceState["notes"]),
					};
					const noteContent = "noteContent";

					const state = reducer(
						previousState,
						addNote({ noteContent: noteContent }),
					);

					expect(state.noteIdsOrder).toHaveLength(
						notesMock.length + 1,
					);
					const noteIdIndex = state.noteIdsOrder.findIndex(
						id => !previousState.noteIdsOrder.includes(id),
					);
					expect(noteIdIndex).toEqual(notesMock.length);
					const noteId = state.noteIdsOrder[noteIdIndex];
					expect(state.notes[noteId]).toEqual<NoteModel>({
						id: noteId,
						content: noteContent,
						isComplete: false,
					});
				});
			});
		});

		describe("updateNote", () => {
			describe("update only content", () => {
				it("should update a note", () => {
					const content = "content";
					const note = generateNote({ content });
					const previousState: SliceState = {
						noteIdsOrder: [note.id],
						notes: { [note.id]: note },
					};
					const newContent = "newContent";

					const state = reducer(
						previousState,
						updateNote({
							noteId: note.id,
							newNoteDetails: { content: newContent },
						}),
					);

					expect(state.noteIdsOrder).toHaveLength(1);
					expect(state.notes[note.id]).toEqual<NoteModel>({
						...note,
						content: newContent,
					});
				});
			});

			describe("update only complete status", () => {
				it("should update a note", () => {
					const isComplete = true;
					const note = generateNote({ isComplete });
					const previousState: SliceState = {
						noteIdsOrder: [note.id],
						notes: { [note.id]: note },
					};

					const state = reducer(
						previousState,
						updateNote({
							noteId: note.id,
							newNoteDetails: { isComplete: !isComplete },
						}),
					);

					expect(state.noteIdsOrder).toHaveLength(1);
					expect(state.notes[note.id]).toEqual<NoteModel>({
						...note,
						isComplete: !isComplete,
					});
				});
			});

			describe("update both content and complete status", () => {
				it("should update a note", () => {
					const content = "content";
					const isComplete = true;
					const note = generateNote({ content, isComplete });
					const previousState: SliceState = {
						noteIdsOrder: [note.id],
						notes: { [note.id]: note },
					};
					const newContent = "newContent";

					const state = reducer(
						previousState,
						updateNote({
							noteId: note.id,
							newNoteDetails: {
								content: newContent,
								isComplete: !isComplete,
							},
						}),
					);

					expect(state.noteIdsOrder).toHaveLength(1);
					expect(state.notes[note.id]).toEqual<NoteModel>({
						...note,
						content: newContent,
						isComplete: !isComplete,
					});
				});
			});
		});

		describe("removeNotes", () => {
			describe("remove single note", () => {
				it("should remove single note", () => {
					const previousState: SliceState = {
						noteIdsOrder: notesMock.map(note => note.id),
						notes: notesMock.reduce((acc, note) => {
							acc[note.id] = note;
							return acc;
						}, {} as SliceState["notes"]),
					};

					const state = reducer(
						previousState,
						removeNotes({ noteIdsToRemove: [notesMock[0].id] }),
					);

					expect(state.noteIdsOrder).toHaveLength(
						notesMock.length - 1,
					);
					expect(state.noteIdsOrder).toEqual(
						notesMock.slice(1).map(note => note.id),
					);
					expect(state.notes[notesMock[0].id]).not.toBeDefined();
				});
			});
			describe("remove many notes", () => {
				it("should remove many notes", () => {
					const previousState: SliceState = {
						noteIdsOrder: notesMock.map(note => note.id),
						notes: notesMock.reduce((acc, note) => {
							acc[note.id] = note;
							return acc;
						}, {} as SliceState["notes"]),
					};

					const state = reducer(
						previousState,
						removeNotes({
							noteIdsToRemove: [
								notesMock[0].id,
								notesMock[notesMock.length - 1].id,
							],
						}),
					);

					expect(state.noteIdsOrder).toHaveLength(
						notesMock.length - 2,
					);
					expect(state.noteIdsOrder).toEqual(
						notesMock.map(note => note.id).slice(1, -1),
					);
					expect(state.notes[notesMock[0].id]).not.toBeDefined();
					expect(
						state.notes[notesMock[notesMock.length - 1].id],
					).not.toBeDefined();
				});
			});
		});

		describe("setAllNotesCompleteState", () => {
			describe.each([true, false])(
				"set complete status as %s",
				setAsCompleted => {
					it(`should set every note as ${
						setAsCompleted ? "" : "not "
					}ocomplete`, () => {
						const notesList: NoteModel[] = [
							generateNote({
								isComplete: !setAsCompleted,
								content: "test",
							}),
							generateNote({
								isComplete: !setAsCompleted,
								content: "test",
							}),
							generateNote({
								isComplete: !setAsCompleted,
								content: "test",
							}),
						];
						const previousState: SliceState = {
							noteIdsOrder: notesList.map(note => note.id),
							notes: notesList.reduce((acc, note) => {
								acc[note.id] = note;
								return acc;
							}, {} as SliceState["notes"]),
						};

						const state = reducer(
							previousState,
							setAllNotesCompleteState({
								newIsCompleteStatus: setAsCompleted,
							}),
						);

						expect(state.noteIdsOrder).toEqual(
							notesList.map(note => note.id),
						);
						expect(
							Object.values(state.notes).every(
								note => note.isComplete === setAsCompleted,
							),
						).toBeTruthy();
					});
				},
			);
		});
	});
});
