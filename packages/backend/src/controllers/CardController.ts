import {Body, Controller, Get, Path, Post, Route} from "tsoa";
import {IRepository} from "../repositories/IRepository";
import {Card} from "@app/shared-models/src/Card";
import {CardRepo} from "../repositories/CardRepo";
import {type CardCreationRequest} from "@app/shared-utils/src/api-request-type";

@Route("/api/card")
export class CardController extends Controller{
    private cardRepo: IRepository<Card> = CardRepo.getInstance();

    /**
     * Retrieves a list of all cards
     */
    @Get("")
    public async getCards(): Promise<Card[]> {
        const cards: Card[] = await this.cardRepo.findAll();
        return cards;
    }

    /**
     * Create new card
     */
    @Post()
    public async createCard(
        @Body() requestBody: CardCreationRequest,
    ): Promise<Card> {
        const card = await this.cardRepo.createOne(requestBody);
        return card;
    }

    /**
     * Retrieves card by cardID
     */
    @Get("{cardId}")
    public async getCardById(
        @Path() cardId: number
    ): Promise<Card | null> {
        const card: Card | null = await this.cardRepo.findOneById(cardId);
        return card;
    }

}