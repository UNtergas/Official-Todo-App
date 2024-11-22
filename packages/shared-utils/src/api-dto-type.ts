import {Column} from "@app/shared-models/src/Column";

////////////////////
// API request type
export type ColumnCreationRequestDTO = Omit<Column, 'id' | 'cards'>;


//////////////////////////////////////////////////////////////////////////////////////////////////
// API response type (Typically, API response type is Model, but sometimes it can be transformed)