import {Action, AppState} from "@frontend/utils/utils-type.ts";
import {findItemIndexById, moveItem} from "@frontend/utils";
import {Card} from "@app/shared-models/src/Card";


export const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "ADD_COLUMN": {
            const column = action.payload
            console.log('column', column);
            if (!column) {
                return state
            }
            return {
                ...state,
                columns: [
                    ...state.columns,
                    column
                ]
            }
        }
        case "ADD_CARD": {
            const card = action.payload;

            if (!card) {
                return state
            }

            const targetColumnId = card.columnId;

            const targetColumnPosition = findItemIndexById(state.columns, targetColumnId);
            const targetColumn = state.columns[targetColumnPosition];

            const updatedCardsOfTargetColumn = [...targetColumn.cards, card];

            const updatedColumn = { ...targetColumn, cards: updatedCardsOfTargetColumn };

            const updatedColumns = state.columns.map(column => column.id === targetColumnId ? updatedColumn : column);
            return {
                ...state,
                columns: updatedColumns
            }
        }
        case "MOVE_COLUMN": {
            const { dragIndex, hoverIndex } = action.payload
            return {
                ...state,
                columns: moveItem(state.columns, dragIndex, hoverIndex)
            }
        }

        case "MOVE_CARD": {
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
        case "DELETE_CARD": {
            const { cardId, columnId } = action.payload;
            const targetColumn = state.columns[findItemIndexById(state.columns, columnId)];

            const updatedCardsInTargetColumn = targetColumn.cards.filter(task => task.id !== cardId);

            const updatedTargetColumn = { ...targetColumn, cards: updatedCardsInTargetColumn };

            const updatedColumns = state.columns.map(column => column.id === columnId ? updatedTargetColumn : column);
            return {
                ...state,
                columns: updatedColumns
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