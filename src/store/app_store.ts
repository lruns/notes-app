import EditorStore from "./editor_store.ts"
import NoteStore from "./note_store.ts"

export default class AppStore {
    noteStore: NoteStore;
    editorStore: EditorStore;

    constructor() {
        this.noteStore = new NoteStore();
        this.editorStore = new EditorStore(this.noteStore);
    }
}