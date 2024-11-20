import {Action, AppState, Card} from "@frontend/types/models.ts";
import {v4 as uuid} from "uuid";
import {findItemIndexById, moveItem} from "@frontend/utils";

export const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "ADD_LIST": {
            // Reducer logic here...
            const text = action.payload
            if (!text) {
                return state
            }
            return {
                ...state,
                columns: [
                    ...state.columns,
                    { id: uuid(), columnName: text, cards: [] }
                ]
            }
        }
        case "ADD_TASK": {
            const { text, taskId } = action.payload;
            console.log(text, taskId);
            if (!text) {
                return state
            }
            const targetLaneIndex = findItemIndexById(state.columns, taskId)
            const targetLane = state.columns[targetLaneIndex];

            const updatedTasks = [...targetLane.cards, { id: uuid(), description: text }];

            const updatedLane = { ...targetLane, cards: updatedTasks };

            const updatedLists = state.columns.map(list => list.id === taskId ? updatedLane : list);
            return {
                ...state,
                columns: updatedLists
            }
        }
        case "MOVE_LIST": {
            const { dragIndex, hoverIndex } = action.payload
            return {
                ...state,
                columns: moveItem(state.columns, dragIndex, hoverIndex)
            }

        }

        case "MOVE_TASK": {
            const { dragIndex, hoverIndex, sourceColumn, targetColumn } = action.payload;

            const sourceLaneIndex = findItemIndexById(state.columns, sourceColumn);
            const targetLaneIndex = findItemIndexById(state.columns, targetColumn);

            const sourceLane = state.columns[sourceLaneIndex];
            const targetLane = state.columns[targetLaneIndex];



            // Remove the task from the source column
            const updatedSourceTasks = [...sourceLane.cards];
            const item = updatedSourceTasks.splice(dragIndex, 1)[0];

            let updatedTargetTasks: Card[] = [];
            // Insert the task into the target column at the specified index
            if (sourceColumn === targetColumn) {
                updatedTargetTasks = updatedSourceTasks;
            } else {
                // Otherwise, create a new copy of the tasks from the target column
                updatedTargetTasks = [...targetLane.cards];
            }
            updatedTargetTasks.splice(hoverIndex, 0, item);

            // Update the source and target columns with the updated tasks
            const updatedSourceLane = { ...sourceLane, cards: updatedSourceTasks };
            const updatedTargetLane = { ...targetLane, cards: updatedTargetTasks };

            // Update the lists with the updated source and target columns
            const updatedLists = [...state.columns];
            updatedLists[sourceLaneIndex] = updatedSourceLane;
            updatedLists[targetLaneIndex] = updatedTargetLane;

            return {
                ...state,
                columns: updatedLists
            };
        }
        case "DELETE_TASK": {
            const { taskId, columnId } = action.payload;
            const targetLaneIndex = findItemIndexById(state.columns, columnId);
            const targetLane = state.columns[targetLaneIndex];

            const updatedTasks = targetLane.cards.filter(task => task.id !== taskId);

            const updatedLane = { ...targetLane, cards: updatedTasks };

            const updatedLists = state.columns.map(list => list.id === columnId ? updatedLane : list);
            return {
                ...state,
                columns: updatedLists
            }
        }
        case "DELETE_COLUMN": {
            const { columnId } = action.payload;
            const updatedLists = state.columns.filter(list => list.id !== columnId);
            return {
                ...state,
                columns: updatedLists
            }
        }
        default: {
            return state
        }
    }
}