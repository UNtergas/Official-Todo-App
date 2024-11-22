
import { ColumnContainer, ColumnTitle, DeleteButton } from "@frontend/styles";
import AddNewItem from "./AddNewItem";
import { useAppState } from "@frontend/hooks";
import Card from "./Card";
import { StrictModeDroppable } from "@frontend/utils/StrictModeDroppable";
import {apiClient} from "@frontend/api-client.ts";


interface ColumnProp {
    text: string,
    index: number,
    id: string,
    isDragged?: boolean
}


const Column = ({ text, index, id, isDragged }: ColumnProp) => {
    const { state, dispatch } = useAppState()

    const onAddCard = async (text: string) => {
        dispatch({ type: "ADD_CARD", payload: { text, cardId: id } })
    }

    return (
        <>
            <ColumnContainer $isDragged={isDragged}>
                <ColumnTitle>
                    {text}
                    <DeleteButton onClick={() => dispatch({ type: "DELETE_COLUMN", payload: { columnId: id } })} > X</DeleteButton>
                </ColumnTitle>

                <StrictModeDroppable droppableId={id} type="card" >
                    {
                        (provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {state.columns[index].cards.map((task, index) => (
                                    <Card text={task.description} id={task.id.toString()} index={index} key={task.id} columnId={id} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )
                    }
                </StrictModeDroppable>
                <AddNewItem
                    toggleButtonText="+ Add new task"
                    //! taskId here is Column's id
                    onAdd={() => onAddCard(text)}
                    dark
                />
            </ColumnContainer>
        </>
    )
}

export default Column