import {EditorState, Plugin} from "prosemirror-state";
import {schema} from "prosemirror-schema-basic"
import {useState} from "react";
import {ProseMirror} from "@nytimes/react-prosemirror";
import {keymap} from "prosemirror-keymap";
import {history, redo, undo} from "prosemirror-history";
import {baseKeymap} from "prosemirror-commands";

const counterPlugin = new Plugin({
    state: {
        init: () => 0,
        apply(transaction, state) {
            const counterPluginMeta = transaction.getMeta(this);
            switch (counterPluginMeta?.type) {
                case "counter/incremented":
                    return state + 1;
                case "counter/decremented":
                    return state - 1;
                default:
                    return state;
            }
        },
    },
    view: (view) => {
        const countElement = document.getElementById("count");
        // counterPlugin.getState() is like a plugin-specific state selector!
        const count = counterPlugin.getState(view.state);
        countElement.innerHTML = count.toString();

        document.getElementById("increment").addEventListener("click", () => {
            const transaction = view.state.tr;
            transaction.setMeta(counterPlugin.key, {type: "counter/incremented"});
            view.dispatch(transaction);
        });

        document.getElementById("decrement").addEventListener("click", () => {
            const transaction = view.state.tr;
            transaction.setMeta(counterPlugin.key, {type: "counter/decremented"});
            view.dispatch(transaction);
        });

        return {
            update: (view, prevState) => {
                const count = counterPlugin.getState(view.state);
                countElement.innerHTML = count.toString();
            },
        };
    },
});

const App = () => {

    const [mount, setMount] = useState<HTMLElement | null>(null);
    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.create({
            schema,
            plugins: [
                history(),
                keymap({"Mod-z": undo, "Mod-y": redo}),
                keymap(baseKeymap),
                counterPlugin,
            ]
        })
    );

    return (
        <div>
            <button id="increment">Increment</button>
            <button id="decrement">Decrement</button>
            <div id="count"></div>
            <ProseMirror mount={mount} state={editorState} dispatchTransaction={(transaction => {
                const newState = editorState.apply(transaction);
                setEditorState(newState);
            })}>
                <div ref={setMount}/>
            </ProseMirror>
        </div>
    );
};

export default App
