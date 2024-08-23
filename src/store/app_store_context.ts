import {createContext, useContext} from "react";
import AppStore from "./app_store.ts";

export const AppStoreContext = createContext<AppStore | null>(null)

export const useStore = () => {
    const context = useContext(AppStoreContext);
    if (context === null) {
        throw new Error(
            "You have forgotten to wrap your root component with RootStoreProvider"
        );
    }
    return context;
};