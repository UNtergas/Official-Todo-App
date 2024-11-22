import {Body, Controller, Delete, Get, Path, Post, Put, Route} from "tsoa";
import {IRepository} from "../repositories/IRepository";
import {Card} from "@app/shared-models/src/Card";
import {CardRepo} from "../repositories/CardRepo";
import {type CardCreationRequestDTO} from "@app/shared-utils/src/api-dto-type";

@Route("/api/card")
export class CardController extends Controller{
    private cardRepo: IRepository<Card> = CardRepo.getInstance();

    /**
     * Retrieves a list of all cards
     */
    @Get("")
    public async getCards(): Promise<Card[]> {
        return await this.cardRepo.findAll();
    }

    /**
     * Create new card
     */
    @Post()
    public async createCard(
        @Body() requestBody: CardCreationRequestDTO,
    ): Promise<Card> {
        return await this.cardRepo.createOne(requestBody);
    }

    /**
     * Retrieves card by cardID
     */
    @Get("{cardId}")
    public async getCardById(
        @Path() cardId: string
    ): Promise<Card | null> {
        return await this.cardRepo.findOneById(cardId);
    }

    @Put("{cardId}")
    public async editCardById(
        @Path() cardId: string,
        @Body() requestBody: Partial<Card>
    ): Promise<Card> {
        const card = await this.cardRepo.findOneById(cardId);
        if (!card) {
            throw new Error("Card not found");
        }

        return await this.cardRepo.updateOne(cardId, requestBody);
    }

    @Delete("{cardId}")
    public async deleteCardById(
        @Path() cardId: string
    ) {
        return await this.cardRepo.deleteOne(cardId);
    }

}