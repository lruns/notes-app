import noteStore from "../../store/notes.ts"
import {observer} from "mobx-react-lite";
import styles from "./note_container.module.css"

export type NoteContainerProps = {
    openModal: () => void,
}

const NoteContainer = observer((props: NoteContainerProps) => {
    return (
        <div className={styles.container}>
            <button className={styles.addNewNote} onClick={() => props.openModal()}>
                Add new note
            </button>
            {noteStore.notes.map(note => (
                <article className={styles.noteWrapper} key={note.id}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </article>
            ))}
        </div>
    )
});

export default NoteContainer