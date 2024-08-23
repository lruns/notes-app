import {makeAutoObservable} from "mobx";
import NoteStore, {Note} from "./note_store.ts";

export enum EditorMode {
    NONE = "NONE",
    CREATE = "CREATE",
    EDIT = "EDIT",
}

export default class EditorStore {
    noteStore: NoteStore;

    currentMode: EditorMode = EditorMode.NONE;
    currentNote: Note = {"id": "", "title": "", "content": ""}

    constructor(noteStore: NoteStore) {
        this.noteStore = noteStore;
        makeAutoObservable(this)
    }

    startNewNote = () => {
        this.currentNote = {"id": "", "title": "", "content": ""};
        this.currentMode = EditorMode.CREATE;
    }

    startEditNote = (note: Note) => {
        this.currentNote = {...note};
        this.currentMode = EditorMode.EDIT;
    }

    stopEdit = () => {
        this.currentMode = EditorMode.NONE;
    }

    submit = () => {
        const note = this.currentNote;
        if (this.currentMode === EditorMode.CREATE) {
            this.noteStore.addNote(note.title, note.content);
        } else if (this.currentMode === EditorMode.EDIT) {
            this.noteStore.updateNote(note);
        }
        this.stopEdit();
    }
}