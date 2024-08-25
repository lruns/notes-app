import styles from "./note_container.module.css"
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/app_store_context.ts";
import {useCallback} from "react";

const NoteContainer = observer(() => {
    const {noteStore, editorStore} = useStore()

    return (
        <div className={styles.container}>
            <button className={styles.addNewNote} onClick={() => editorStore.startNewNote()}>
                Создать новую заметку
            </button>
            {noteStore.notes.map(note => (
                <NoteComponent note={note}/>
            ))}
        </div>
    )
});

const NoteComponent = observer(({note}) => {
    const {noteStore, editorStore} = useStore()

    const removeNote = useCallback((id) => {
        noteStore.removeNote(id);
        editorStore.stopEdit()
    }, [editorStore, noteStore])

    return (
        <article className={styles.noteWrapper} key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className={styles.buttonContainer}>
                <button onClick={() => editorStore.startEditNote(note)}>
                    Изменить
                </button>
                <button onClick={() => removeNote(note.id)}>
                    Удалить
                </button>
            </div>
        </article>
    )
});

export default NoteContainer