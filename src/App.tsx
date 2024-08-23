import NoteContainer from "./components/note_container/note_container.tsx";
import "./App.css"
import NoteEditor from "./components/note_editor/note_editor.tsx";
import AppStore from "./store/app_store.ts";
import {AppStoreContext} from "./store/app_store_context.ts";
import withLoading from "./components/UI/loading/with_loading.tsx";
import {useState} from "react";

const LoadingNotes = withLoading(NoteContainer);

const App = () => {
    const [loading, setLoading] = useState(true);

    // Simulate loading delay for demonstration purpose
    // setTimeout(() => {
    //     setLoading(false)
    // }, 1000);

    return (
        <AppStoreContext.Provider value={new AppStore()}>
            <h1 className={"app-title"}>Note app</h1>
            <div className={"note-container-wrapper"}>
                {/*<LoadingNotes loading={loading}/>*/}
                <NoteContainer/>
            </div>
            <NoteEditor/>
        </AppStoreContext.Provider>
    )
};

export default App
