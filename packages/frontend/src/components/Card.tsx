
import { Draggable } from "react-beautiful-dnd";
import { CardContainer, DeleteButton } from "../styles";
import { useAppState } from "../hooks";
import {apiClient} from "@frontend/utils/api-client.ts";

interface CardProp {
    text: string
    id: string
    index: number
    columnId: string
}


const Card = ({ text, id, index, columnId }: CardProp) => {
    const { dispatch } = useAppState();

    const onDeleteCard = async () => {
        await apiClient.card.deleteOne(id);
        dispatch({ type: "DELETE_CARD", payload: { cardId: id, columnId } });
    }

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
                        <DeleteButton onClick={() => onDeleteCard()} > X</DeleteButton>
                    </CardContainer>
                )
            }
        </Draggable >
    )
}


export default Card