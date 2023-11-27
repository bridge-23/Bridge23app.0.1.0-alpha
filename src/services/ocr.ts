//../src/services/ocr.ts
import * as mindee from "mindee";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const mindeeClient = new mindee.Client({ apiKey: process.env.MINDEE_API_KEY });

export async function parseDocument(fileInput: string | Buffer) {
    try {
        let inputSource;

        if (Buffer.isBuffer(fileInput)) {
            // Handle the case where fileInput is a buffer
            inputSource = mindeeClient.docFromBuffer(fileInput, "receipt.jpg");
        } else {
            // Handle the case where fileInput is a file path
            const stream = fs.createReadStream(fileInput);
            inputSource = mindeeClient.docFromStream(stream, "receipt.jpg");
        }

        const apiResponse = await mindeeClient.parse(
            mindee.product.ReceiptV5,
            inputSource
        );

        const receiptData = apiResponse.document.inference.prediction;
        console.log(receiptData);

        return receiptData;
    } catch (error: unknown) {
        // We need to narrow down the type of 'error' from 'unknown' to something more specific
        if (error instanceof Error) {
            console.error("Error parsing document:", error.message);
            // Now you can access error properties like 'message' because 'error' is typed as 'Error'
            if ('response' in error) { // Additional type guard to access custom properties
                const response = (error as any).response;
                if (response) {
                    console.error("Response body:", response.body);
                    console.error("Status code:", response.status);
                    console.error("Headers:", response.headers);
                }
            }
        } else {

            console.error("An unexpected error occurred:", error);
        }
        throw error; // Rethrow the error to be handled by the caller
    }
}


