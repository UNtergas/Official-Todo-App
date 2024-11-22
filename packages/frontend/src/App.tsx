
import { DragDropContext } from "react-beautiful-dnd";

import { AppContainer } from '@frontend/styles';
import { AddNewItem, DragColumn } from '@frontend/components';

import { useAppState } from '@frontend/hooks';
import { StrictModeDroppable } from '@frontend/utils/StrictModeDroppable';
import {apiClient} from "@frontend/api-client.ts";


export const App = () => {
    const { state, dispatch } = useAppState()

    const onDragEnd = (result: any) => {
        const { destination, source, type } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        switch (type) {
            case "column":
                dispatch({ type: "MOVE_COLUMN", payload: { dragIndex: source.index, hoverIndex: destination.index } });
                break
            case "card":
                dispatch({ type: "MOVE_CARD", payload: { dragIndex: source.index, hoverIndex: destination.index, sourceColumn: source.droppableId, targetColumn: destination.droppableId } })
                break
        }
    };

    const onAddColumn = async (columnName: string)=> {
        const createdColumn = await apiClient.column.createOne({columnName: columnName});
        dispatch({ type: "ADD_COLUMN", payload: createdColumn });
    }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <StrictModeDroppable droppableId="column" direction='horizontal' type='column'>
                    {
                        provided => (
                            <AppContainer {...provided.droppableProps} ref={provided.innerRef}>
                                {state.columns.map((list, i) => (
                                    <DragColumn id={list.id.toString()} text={list.columnName} key={list.id} index={i} />
                                ))}
                                <AddNewItem toggleButtonText='+ Add new list'
                                            onAdd={text => onAddColumn(text)} />
                                {provided.placeholder}
                            </AppContainer>
                        )
                    }
                </StrictModeDroppable>
            </DragDropContext>
        </>
    );
}

