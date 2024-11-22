import {DragDropContext, DropResult} from "react-beautiful-dnd";

import {AppContainer} from '@frontend/styles';
import {AddNewItem, DragColumn} from '@frontend/components';

import {useAppState} from '@frontend/hooks';
import {StrictModeDroppable} from '@frontend/utils/StrictModeDroppable';
import {apiClient} from "@frontend/utils/api-client.ts";
import {Card} from "@app/shared-models/src/Card";
import {Column} from "@app/shared-models/src/Column";

export const App = () => {
    const {state, dispatch} = useAppState()

    const onDragEnd = async (result: DropResult) => {
        const {destination, source, type} = result;

        if (!destination) {
            return;
        }

        /**
         * index is the position of card/column in their container (container of card is column, container of column is state)
         * droppableId is:
         * - For card move: the id of column
         * - For column move: fixed value 'column' (make sense because there is only one state in application)
         */
        const {droppableId: destinationDroppableId, index: destinationIndex} = destination;
        const {droppableId: sourceDroppableId, index: sourceIndex} = source;

        if (destinationDroppableId === sourceDroppableId && destinationIndex === sourceIndex) {
            return;
        }
        switch (type) {
            case "column":
                dispatch({type: "MOVE_COLUMN", payload: {dragIndex: sourceIndex, hoverIndex: destinationIndex}});
                break
            case "card":
                const sourceColumn: Column = state.columns.find(column => column.id === sourceDroppableId) as Column;
                const card: Card = sourceColumn.cards[sourceIndex] as Card;

                await apiClient.card.updateOne(card.id, {
                    description: card.description,
                    id: card.id,
                    columnId: destinationDroppableId,
                });

                dispatch({
                    type: "MOVE_CARD",
                    payload: {
                        dragIndex: sourceIndex,
                        hoverIndex: destinationIndex,
                        sourceColumn: sourceDroppableId,
                        targetColumn: destinationDroppableId
                    }
                })
                break
        }
    };

    const onAddColumn = async (columnName: string) => {
        const createdColumn = await apiClient.column.createOne({columnName: columnName});
        dispatch({type: "ADD_COLUMN", payload: createdColumn});
    }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <StrictModeDroppable droppableId="column" direction='horizontal' type='column'>
                    {
                        provided => (
                            <AppContainer {...provided.droppableProps} ref={provided.innerRef}>
                                {state.columns.map((list, i) => (
                                    <DragColumn id={list.id.toString()} text={list.columnName} key={list.id} index={i}/>
                                ))}
                                <AddNewItem toggleButtonText='+ Add new list'
                                            onAdd={text => onAddColumn(text)}/>
                                {provided.placeholder}
                            </AppContainer>
                        )
                    }
                </StrictModeDroppable>
            </DragDropContext>
        </>
    );
}

