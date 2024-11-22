import {IRepository} from "./IRepository";
import {Card} from "@app/shared-models/src/Card";
import {PRISMA_CLIENT, Prisma} from "../../prisma";
import {CardCreationRequestDTO} from "@app/shared-utils/src/api-dto-type";

export class CardRepo implements IRepository<Card> {
    private static instance: CardRepo | null = null;

    private constructor() {
    }

    public static getInstance() : CardRepo {
        if (!CardRepo.instance) {
            CardRepo.instance = new CardRepo();
        }
        return CardRepo.instance;
    }

    async count(): Promise<number> {
        return PRISMA_CLIENT.card.count();
    }

    async createOne(cardCreationRequest: CardCreationRequestDTO): Promise<Card> {
        return PRISMA_CLIENT.card.create({
            data: cardCreationRequest,
        });
    }

    async deleteOne(id: string): Promise<Card | null> {
        return PRISMA_CLIENT.card.delete({
            where: {
                id: id
            }
        })
    }

    async deleteMany(): Promise<void> {
        return PRISMA_CLIENT.card.deleteMany({}).then(() => {});
    }

    async findAll(): Promise<Array<Card>> {
        return PRISMA_CLIENT.card.findMany();
    }

    async findOneById(id: string): Promise<Card | null> {
        return PRISMA_CLIENT.card.findUnique({
            where: {
                id: id
            }
        });
    }

    updateOne(cardId: string, cardUpdateData: Partial<Card>): Promise<Card> {
        return PRISMA_CLIENT.card.update({
            where: {
                id: cardId,
            },
            data: cardUpdateData,
        });
    }
}