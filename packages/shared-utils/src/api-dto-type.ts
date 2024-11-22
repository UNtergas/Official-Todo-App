import {Column} from "@app/shared-models/src/Column";
import {Card} from "@app/shared-models/src/Card";

////////////////////
// API request type
export type ColumnCreationRequestDTO = Omit<Column, 'id' | 'cards'>;
export type CardCreationRequestDTO = Omit<Card, 'id'>;


//////////////////////////////////////////////////////////////////////////////////////////////////
// API response type (Typically, API response type is Model, but sometimes it can be transformed)