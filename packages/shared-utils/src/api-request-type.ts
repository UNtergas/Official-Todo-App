import {Column} from "@app/shared-models/src/Column";
import {Card} from "@app/shared-models/src/Card";

////////////////////
// API request type
export type ColumnCreationRequest = Omit<Column, 'id' | 'cards'>;

export type CardCreationRequest = Omit<Card, 'id'>;