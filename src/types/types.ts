// Interfaces for the API

export interface ApiRequest {
    when: string;
    lanes: number;
    people: number;
    shoes:  number[];
}

export interface ApiResponse extends ApiRequest {
    price: number;
    id: string;
    active: boolean
}

export interface RequestOptions {
    method: string;
    headers: {
        "x-api-key": string
  
    },
    body: string;
}
