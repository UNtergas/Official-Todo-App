import {IRepository} from "./IRepository";
import {Column} from "@app/shared-models/src/Column";
import {PRISMA_CLIENT} from "../../prisma";
import {ColumnCreationRequestDTO} from "@app/shared-utils/src/api-dto-type";
import {Prisma} from "@prisma/client";

export class ColumnRepo implements IRepository<Column> {
    private static instance: ColumnRepo | null = null;

    private constructor() {
    }

    public static getInstance() : ColumnRepo {
        if (!ColumnRepo.instance) {
            ColumnRepo.instance = new ColumnRepo();
        }
        return ColumnRepo.instance;
    }

    async count(): Promise<number> {
        return PRISMA_CLIENT.column.count();
    }

    async createOne(columnCreationRequest: ColumnCreationRequestDTO): Promise<Column> {
        return PRISMA_CLIENT.column.create({
            data: columnCreationRequest,
            include: {
                cards: true,
            },
        });
    }

    async deleteOne(id: string): Promise<Column | null> {
        return PRISMA_CLIENT.column.delete({
            where: {
                id: id
            },
            include: {
                cards: true,
            }
        })
    }

    async deleteMany(): Promise<void> {
        return PRISMA_CLIENT.column.deleteMany({}).then(() => {});
    }

    async findAll(): Promise<Array<Column>> {
        return PRISMA_CLIENT.column.findMany({
            include: {
                cards: true,
            }
        });
    }

    async findOneById(id: string): Promise<Column | null> {
        return PRISMA_CLIENT.column.findUnique({
            where: {
                id: id
            },
            include: {
                cards: true,
            }
        });
    }

    updateOne(columnId: string, columnUpdateData: Partial<Column>): Promise<Column> {
        /**
         * Prisma expects `cards` in update payload has type string (cardId)
         * In case `cards` is undefined, prisma won't update the existing cards
         * In case `connect` is used, the connected cards must be existed, if not prisma client throws an exception
         * In case `set` is used, the existing relations will be overwritten
         */
        const updatePayload: Prisma.ColumnUpdateInput = {
            ...columnUpdateData,
            cards: columnUpdateData.cards
                ? {
                    connect: columnUpdateData.cards.map((card) => ({ id: card.id })),
                }
                : undefined,
        }

        return PRISMA_CLIENT.column.update({
            where: {
                id: columnId,
            },
            data: updatePayload,
            include: {
                cards: true,
            }
        });
    }
}