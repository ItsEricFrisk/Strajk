import { ApiRequest, ApiResponse, RequestOptions } from "../types/types"

    const API_KEY = import.meta.env.VITE_API_KEY
    const API_URL = "/api"

export async function fetchBooking(reqData: ApiRequest): Promise<ApiResponse | null> {
    try {
        const reqOptions: RequestOptions = {
            method: "POST",
            headers: {
                 "x-api-key": API_KEY
        
            },
            body: JSON.stringify(reqData),
        }

        // API CALL
        const response = await fetch(API_URL, reqOptions)
        
        if (!response.ok) {
            console.log("Something went wrong with the response: ", response.status, response.statusText);
            return null;
        }
        
        const bookingResult: ApiResponse = await response.json();
        return bookingResult;   
    } catch (error) {
        console.error("There was a problem retrieving the data. Error: ", error);
        return null
    } 
}
