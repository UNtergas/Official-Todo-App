import {ColumnCreationRequestDTO} from "@app/shared-utils/src/api-dto-type.ts";
import {Column} from "@app/shared-models/src/Column";

export const apiClient = {
    column: {
        getAll: (): Promise<Array<Column>> => sendRequest('GET', '/api/column'),
        getOneById: (id: number ): Promise<Column> => sendRequest('GET', `/api/column/${id}`),
        createOne: (data: ColumnCreationRequestDTO): Promise<Column> => sendRequest('POST', '/api/column', data),
    }
}

////////////////////////////////
// Base method for API request
async function sendRequest(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', endpoint: string, body?: any) : Promise<any> {
    try {
        console.log('body::', body);
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
