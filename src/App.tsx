import NoteContainer from "./components/note_container/note_container.tsx";
import "./App.css"
import NoteForm from "./components/note_form/note_form.tsx";
import Modal from "./components/UI/modal/modal.tsx";
import {useState} from "react";

function App() {
    const [modalVisibility, setModalVisible] = useState(false);

    return (
        <>
            <h1 className={"app-title"}>Note app</h1>
            <Modal active={modalVisibility} setModalVisible={setModalVisible}>
                <NoteForm/>
            </Modal>
            <div className={"note-container-wrapper"}>
                <NoteContainer openModal={() => setModalVisible(true)}/>
            </div>
        </>
    )
}

export default App
