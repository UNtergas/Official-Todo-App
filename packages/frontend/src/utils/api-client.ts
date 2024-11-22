import {CardCreationRequestDTO, ColumnCreationRequestDTO} from "@app/shared-utils/src/api-dto-type.ts";
import {Column} from "@app/shared-models/src/Column.ts";
import {Card} from "@app/shared-models/src/Card.ts";

export const apiClient = {
    column: {
        getAll: (): Promise<Array<Column>> => sendRequest('GET', '/api/column'),
        getOneById: (id: string ): Promise<Column> => sendRequest('GET', `/api/column/${id}`),
        createOne: (data: ColumnCreationRequestDTO): Promise<Column> => sendRequest('POST', '/api/column', data),
        deleteOne: (columnId: string): Promise<Column | null> => sendRequest('DELETE', `/api/column/${columnId}`),
    },
    card: {
        getAll: (): Promise<Array<Card>> => sendRequest('GET', '/api/card'),
        getOneById: (id: string): Promise<Card> => sendRequest('GET', `/api/card/${id}`),
        createOne: (data: CardCreationRequestDTO): Promise<Card> => sendRequest('POST', '/api/card', data),
        updateOne: (cardId: string, data: Partial<Card>): Promise<Card> => sendRequest('PUT', `/api/card/${cardId}`, data),
        deleteOne: (cardId: string): Promise<Card | null> => sendRequest('DELETE', `/api/card/${cardId}`),
    }
}

////////////////////////////////
// Base method for API request
async function sendRequest(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', endpoint: string, body?: any) : Promise<any> {
    try {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(endpoint, options);

        return await response.json();
    } catch(error) {
        console.log(error);
    }
}
