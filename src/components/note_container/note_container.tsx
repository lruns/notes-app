import styles from "./note_container.module.css"
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/app_store_context.ts";


const NoteContainer = observer(() => {
    const {editorStore} = useStore()

    return (
        <div className={styles.container}>
            <button className={styles.addNewNote} onClick={() => editorStore.startNewNote()}>
                Add new note
            </button>
            <Notes/>
        </div>
    )
});

const Notes = observer(() => {
    const {noteStore, editorStore} = useStore()

    return (
        <>
            {noteStore.notes.map(note => (
                <article className={styles.noteWrapper} key={note.id}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <button className={styles.editNote} onClick={() => editorStore.startEditNote(note)}>
                        Edit note
                    </button>
                </article>
            ))}
        </>
    )
});

export default NoteContainer