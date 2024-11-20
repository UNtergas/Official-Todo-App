import React from "react";

export interface Card {
    id: string
    description: string
}

export interface Column {
    id: string
    columnName: string
    cards: Card[]
}

export type Action =
    | {
    type: "ADD_LIST"
    payload: string
}
    | {
    type: "ADD_TASK"
    payload: { text: string; taskId: string }
}
    | {
    type: "MOVE_LIST"
    payload: {
        dragIndex: number
        hoverIndex: number
    }
}
    | {
    type: "MOVE_TASK"
    payload: {
        dragIndex: number
        hoverIndex: number
        sourceColumn: string
        targetColumn: string
    }
}
    | {
    type: "DELETE_TASK"
    payload: {
        taskId: string
        columnId: string
    }
}
    | {
    type: "DELETE_COLUMN"
    payload: {
        columnId: string
    }

}

export interface AppState {
    columns: Column[],
}


export interface AppStateContextProps {
    state: AppState
    dispatch: React.Dispatch<Action> // Add the dispatch property
}