import NoteForm from "./note_form/note_form.tsx";
import Modal from "../UI/modal/modal.tsx";
import {EditorMode} from "../../store/editor_store.ts";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/app_store_context.ts";

const NoteEditor = observer(() => {
    const editorStore = useStore().editorStore;

    return (
        <Modal modalVisible={editorStore.currentMode !== EditorMode.NONE}
               hideModal={() => editorStore.stopEdit()}>
            <NoteForm/>
        </Modal>
    );
});

export default NoteEditor;