import React, { createContext, useReducer } from "react"
import {AppState, AppStateContextProps} from "@frontend/types/models.ts";
import {appStateReducer} from "@frontend/reducer/appStateReducer.ts";
import {apiClient} from "@frontend/api-client.ts";

export const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

const allColumnsFetched = await apiClient.column.getAll();
const initAppState: AppState = {columns: []};

allColumnsFetched.forEach(column => {
    const cards = column.cards;
    const cardsWithIdAsString = []
    for(const card of cards) {
        cardsWithIdAsString.push({...card, id: card.id.toString()});
    }
    initAppState.columns.push({...column, id: column.id.toString(), cards: cardsWithIdAsString});
});

const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, initAppState);

    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}

export { AppStateProvider }