import {IRepository} from "./IRepository";
import {Card} from "@app/shared-models/src/Card";
import {PRISMA_CLIENT, Prisma} from "../../prisma";
import {CardCreationRequest} from "@app/shared-utils/src/api-request-type";

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

    async createOne(cardCreationRequest: CardCreationRequest): Promise<Card> {
        return PRISMA_CLIENT.card.create({
            data: cardCreationRequest,
        });
    }

    async deleteOne(id: number): Promise<Card | null> {
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

    async findOneById(id: number): Promise<Card | null> {
        return PRISMA_CLIENT.card.findUnique({
            where: {
                id: id
            }
        });
    }
}