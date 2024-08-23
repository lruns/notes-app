import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/app_store_context.ts";
import {useCallback} from "react";

const NoteForm = observer(() => {
    const {noteStore, editorStore} = useStore();
    const note = editorStore.currentNote;
    
    const removeNote = useCallback(() => {
        noteStore.removeNote(note.id);
        editorStore.stopEdit()
    }, [editorStore, note.id, noteStore])

    return (
        <div>
            <input value={note.title} onChange={e => note.title = e.target.value}
                   type="text" placeholder="Title"/>
            <textarea value={note.content} onChange={e => note.content = e.target.value}
                      placeholder="Content"/>
            <button onClick={() => editorStore.submit()}>Save</button>
            {editorStore.currentNote.id && <button onClick={() => removeNote()}>Remove</button>}
        </div>
    )
});

export default NoteForm