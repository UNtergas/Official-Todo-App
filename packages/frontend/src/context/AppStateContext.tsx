import React, { createContext, useReducer } from "react"
import {AppState, AppStateContextProps} from "@frontend/utils/utils-type.ts";
import {appStateReducer} from "@frontend/reducer/appStateReducer.ts";
import {apiClient} from "@frontend/api-client.ts";

export const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

const allColumnsFetched = await apiClient.column.getAll();
const initAppState: AppState = {columns: [...allColumnsFetched]};

const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, initAppState);

    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}

export { AppStateProvider }