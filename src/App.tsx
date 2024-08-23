import NoteContainer from "./components/note_container/note_container.tsx";
import "./App.css"
import NoteEditor from "./components/note_editor/note_editor.tsx";
import AppStore from "./store/app_store.ts";
import {AppStoreContext} from "./store/app_store_context.ts";

const App = () => {
    return (
        <AppStoreContext.Provider value={new AppStore()}>
            <h1 className={"app-title"}>Note app</h1>
            <div className={"note-container-wrapper"}>
                <NoteContainer/>
            </div>
            <NoteEditor/>
        </AppStoreContext.Provider>
    )
};

export default App
