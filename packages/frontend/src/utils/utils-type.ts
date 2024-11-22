import React from "react";
import {Column} from "@app/shared-models/src/Column.ts";
import {Card} from "@app/shared-models/src/Card.ts";

export type Action =
    {
        type: "ADD_COLUMN"
        payload: Column
    } |
    {
        type: "ADD_CARD"
        payload: Card
    } |
    {
        type: "MOVE_COLUMN"
        payload: {
            dragIndex: number
            hoverIndex: number
        }
    } |
    {
        type: "MOVE_CARD"
        payload: {
            dragIndex: number
            hoverIndex: number
            sourceColumn: string
            targetColumn: string
        }
    } |
    {
        type: "DELETE_CARD"
        payload: {
            cardId: string
            columnId: string
        }
    } |
    {
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