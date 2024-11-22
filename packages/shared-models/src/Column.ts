import {Card} from "./Card";

export class Column {
    public readonly id: string;
    public columnName: string;
    public cards: Card[];

    constructor(id: string, columnName: string, cards: Card[]) {
        this.id = id;
        this.columnName = columnName;
        this.cards = [...cards];
    }
}