import {makeAutoObservable} from "mobx";

export type Note = {
    id: string;
    title: string;
    content: string;
}

class NoteStore {
    notes: Note[] = [
        {
            id: "1",
            title: "Sample Note 1",
            content: "This is a sample note."
        },
        {
            id: "2",
            title: "Sample Note 2",
            content: "Another sample note."
        },
        {
            id: "3",
            title: "Sample Note 3",
            content: "Yet another sample note."
        },
        {
            id: "4",
            title: "Sample Note 4",
            content: "And finally, a sample note."
        },
        {
            id: "5",
            title: "Sample Note 5",
            content: "This is a sample note with a longer title."
        }
    ];

    constructor() {
        makeAutoObservable(this)
    }

    addNote(title: string, content: string): void {
        const newNote: Note = {
            id: Math.random().toString(36).substring(2, 9),
            title,
            content
        };
        this.notes.push(newNote);
    }

    removeNote(id: string): void {
        this.notes = this.notes.filter(note => note.id!== id);
    }
}

export default new NoteStore();