import noteStore from "../../store/notes.ts"
import {observer} from "mobx-react-lite";
import styles from "./note_form.module.css"

export type NoteFormProps = {
    update
}

const NoteForm = observer(() => {
    return (
        <div>
            <input type="text" placeholder="Title"/>
            <textarea placeholder="Content"/>
            <button onClick={() => noteStore.addNote("Test", "test content")}>Save</button>
        </div>
    )
});

export default NoteForm