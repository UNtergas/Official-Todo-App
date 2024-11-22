import {Column} from "@app/shared-models/src/Column";
import {Card} from "@app/shared-models/src/Card";

////////////////////
// API request type
export type ColumnCreationRequest = Omit<Column, 'id' | 'cards'>;

export type CardCreationRequest = Omit<Card, 'id'>;
////////////////////
// API response type
export type ColumnGetAllDTO = Array<Column>;
export type ColumnGetOneDTO = Column;

export type CardGetAllDTO = Array<Card>;
export type CardGetOneDTO = Card;
