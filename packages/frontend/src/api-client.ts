import {ColumnGetAllDTO, ColumnGetOneDTO} from "@app/shared-utils/src/api-dto-type.ts";

export const apiClient = {
    column: {
        getAll: (): Promise<ColumnGetAllDTO> => sendRequest('GET', '/api/column'),
        getOneById: (id: number ): Promise<ColumnGetOneDTO> => sendRequest('GET', `/api/column/${id}`),
        createOne: (): Promise<ColumnGetOneDTO> => sendRequest('POST', '/api/column'),
    }
}

////////////////////////////////
// Base method for API request
async function sendRequest(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', endpoint: string) : Promise<any> {
    try {
        const response = await fetch(endpoint, {method});
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}
