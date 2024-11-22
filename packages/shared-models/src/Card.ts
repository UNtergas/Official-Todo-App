export class Card {
    public readonly id: string;
    public readonly columnId: string;

    public description: string;

    constructor(id: string, columnId: string, description: string) {
        this.id = id;
        this.columnId = columnId;
        this.description = description;
    }
}