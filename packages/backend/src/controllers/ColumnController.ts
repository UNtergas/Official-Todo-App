import {Body, Controller, Get, Path, Post, Route} from "tsoa";
import {IRepository} from "../repositories/IRepository";
import {Column} from "@app/shared-models/src/Column";
import {ColumnRepo} from "../repositories/ColumnRepo";
import {type ColumnCreationRequestDTO, ColumnGetAllDTO, ColumnGetOneDTO} from "../../../shared-utils/src/api-dto-type";

@Route("/api/column")
export class ColumnController extends Controller {
    private columnRepo: IRepository<Column> = ColumnRepo.getInstance();

    /**
     * Retrieves a list of columns
     */
    @Get("")
    public async getColumns(): Promise<ColumnGetAllDTO> {
        const columns: Column[] = await this.columnRepo.findAll();
        return columns;
    }

    /**
     * Create new column
     */
    @Post()
    public async createColumn(
        @Body() requestBody: ColumnCreationRequestDTO,
    ) : Promise<ColumnGetOneDTO> {
        const column = await this.columnRepo.createOne(requestBody);
        return column;
    }

    /**
     * Retrieves column by columnID
     */
    @Get("{columnId}")
    public async getColumnById(
        @Path() columnId: number
    ): Promise<ColumnGetOneDTO | null> {
        const column: Column | null = await this.columnRepo.findOneById(columnId);
        return column;
    }
}
