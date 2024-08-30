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
                <ProseMirrorEditor/>
            </p>
            <button onClick={() => editorStore.submit()}>
                {editorStore.currentMode === EditorMode.CREATE ? "Создать" : "Обновить"}
            </button>
        </form>
    )
});

import { toggleMark } from "prosemirror-commands";
import { useEditorEventCallback } from "@nytimes/react-prosemirror";

export function BoldButton() {
    const onClick = useEditorEventCallback((view) => {
        const toggleBoldMark = toggleMark(view.state.schema.marks.bold);
        toggleBoldMark(view.state, view.dispatch, view);
    });

    return <button type="button" onClick={onClick}>Bold</button>;
}

// ProseMirrorEditor.tsx
import { EditorState } from "prosemirror-state";
import { schema } from "prosemirror-schema-basic";

import {useState} from "react";
import { ProseMirror } from "@nytimes/react-prosemirror";

import {undo, redo, history} from "prosemirror-history";
import {keymap} from "prosemirror-keymap";
import {baseKeymap} from "prosemirror-commands";


let initState = EditorState.create({
    schema,
    plugins: [
        history(),
        keymap({"Mod-z": undo, "Mod-y": redo}),
        keymap(baseKeymap)
    ]
});

export function ProseMirrorEditor() {
    const [mount, setMount] = useState<HTMLElement | null>(null);
    const [state, setState] = useState(initState);

    return (
        <ProseMirror
            mount={mount}
            state={state}
            dispatchTransaction={(tr) => {
                setState((s) => s.apply(tr));
            }}
        >
            {/*
        We have to mount all components that need to access the
        EditorView as children of the ProseMirror component
      */}
            <BoldButton />
            <div className={styles.textEditor} ref={setMount} />
        </ProseMirror>
    );
}

export default NoteEditor;