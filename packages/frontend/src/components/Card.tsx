
import { Draggable } from "react-beautiful-dnd";
import { CardContainer, DeleteButton } from "../styles";
import { useAppState } from "../hooks";

interface CardProp {
    text: string
    id: string
    index: number
    columnId: string
}


const Card = ({ text, id, index, columnId }: CardProp) => {
    const { dispatch } = useAppState()
    return (
        <Draggable key={id} draggableId={id} index={index}>
            {
                (provided, snapshot) => (
                    <CardContainer $isDragged={snapshot.isDragging}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {text}
                        <DeleteButton onClick={() => dispatch({ type: "DELETE_COLUMN", payload: { cardId: id, columnId } })} > X</DeleteButton>
                    </CardContainer>
                )
            }
        </Draggable >
    )
}


export default Card