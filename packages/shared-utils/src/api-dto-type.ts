import {Column} from "@app/shared-models/src/Column";

////////////////////
// API request type
export type ColumnCreationRequestDTO = Omit<Column, 'id' | 'cards'>;


/////////////////////
// API response type
export type ColumnGetAllDTO = Array<Column>;
export type ColumnGetOneDTO = Column;