import Modal from "../UI/modal/modal.tsx";
import {EditorMode} from "../../store/editor_store.ts";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/app_store_context.ts";
import styles from "./note_editor.module.css";

const NoteEditor = observer(() => {
    const editorStore = useStore().editorStore;

    return (
        <Modal modalVisible={editorStore.currentMode !== EditorMode.NONE}
               hideModal={() => editorStore.stopEdit()}>
            <NoteForm/>
        </Modal>
    );
});

const NoteForm = observer(() => {
    const {editorStore} = useStore();
    const note = editorStore.currentNote;

    return (
        <form className={styles.formContainer}>
            <p>
                <label htmlFor="name">Заголовок</label>
                <br/>
                <input value={note.title} onChange={e => note.title = e.target.value}
                       type="text" placeholder="Введите заголовок"/>
            </p>
            <p>
                <label htmlFor="email">Текст заметки</label>
                <br/>
                <textarea value={note.content} onChange={e => note.content = e.target.value}
                          placeholder="Введите текст заметки"/>
            </p>
            <button onClick={() => editorStore.submit()}>
                {editorStore.currentMode === EditorMode.CREATE ? "Создать" : "Обновить"}
            </button>
        </form>
    )
});

export default NoteEditor;