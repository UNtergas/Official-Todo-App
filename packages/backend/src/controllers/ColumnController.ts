import {Body, Controller, Delete, Get, Path, Post, Route} from "tsoa";
import {IRepository} from "../repositories/IRepository";
import {Column} from "@app/shared-models/src/Column";
import {ColumnRepo} from "../repositories/ColumnRepo";
import {type ColumnCreationRequestDTO} from "@app/shared-utils/src/api-dto-type";

@Route("/api/column")
export class ColumnController extends Controller {
    private columnRepo: IRepository<Column> = ColumnRepo.getInstance();

    /**
     * Retrieves a list of all columns
     */
    @Get("")
    public async getColumns(): Promise<Array<Column>> {
        return await this.columnRepo.findAll();
    }

    /**
     * Create new column
     */
    @Post()
    public async createColumn(
        @Body() requestBody: ColumnCreationRequestDTO,
    ) : Promise<Column> {
        return await this.columnRepo.createOne(requestBody);
    }

    /**
     * Retrieves column by columnID
     */
    @Get("{columnId}")
    public async getColumnById(
        @Path() columnId: string
    ): Promise<Column | null> {
        return await this.columnRepo.findOneById(columnId);
    }

    @Delete("{columnId}")
    public async deleteColumnById(
        @Path() columnId: string
    ) {
        return await this.columnRepo.deleteOne(columnId);
    }
}
