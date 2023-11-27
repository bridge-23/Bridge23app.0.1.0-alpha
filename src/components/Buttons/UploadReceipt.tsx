//..src/components/Buttons/UploadReceipt.tsx
import React, { useState } from 'react';
import { uploadFile, setDoc  } from '@junobuild/core-peer';
import { Button, Typography, Paper, Box, CircularProgress } from '@mui/material';
import {nanoid} from "nanoid";
interface ILineItem {
    description: string;
    totalAmount: number;
}
interface IOcrResult {
    documentId: string;
    filename: string;
    supplierName: string;
    supplierAddress: string;
    totalAmount: number;
    purchaseDate: string;
    purchaseTime: string;
    summary: string;
    lineItems: string;
}
interface IMindeeResponse {
    // Define the structure of the Mindee response here
    // Example:
    documentType?: { value: string };
    date?: { value: string };
    time?: { value: string };
    supplierName?: { value: string };
    supplierAddress?: { value: string };
    totalAmount?: { value: number };
    lineItems?: ILineItem[];
}
const FileUploadAndRecognize = () => {
    const [file, setFile] = useState<File | null>(null);
    const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
    const [ocrResult, setOcrResult] = useState<IOcrResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            const previewUrl = URL.createObjectURL(selectedFile);
            setFilePreviewUrl(previewUrl);
            console.log("File preview URL:", previewUrl);
        }
    };
    const handleUploadAndRecognize = async () => {
        if (file) {
            setIsLoading(true);
            setError('');
            try {
                const uploadResult = await uploadFile({
                    data: file,
                    collection: "receipts",
                });
                console.log("File uploaded successfully:", uploadResult);

                const response = await fetch('/api/parseDocument', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filePath: uploadResult.fullPath }),
                });

                if (response.ok) {
                    const resp = await response.json();
                    console.log("OCR Response:", resp);

                    if (resp && resp.document && resp.document.inference) {
                        const { prediction } = resp.document.inference;
                        // Correctly mapping each item
                        const lineItems = prediction.line_items?.map((item: ILineItem) =>
                            `${item.description}: $${item.totalAmount}`
                        ).join(', ') || 'No line items';
                        const formattedData = prepareDataForDatastore(prediction);

                        setOcrResult({
                            documentId: resp.document.id,
                            filename: resp.document.filename,
                            supplierName: prediction.supplier_name?.value || 'Unknown Supplier',
                            supplierAddress: prediction.supplier_address?.value || 'Address Unknown',
                            totalAmount: prediction.total_amount?.value || 0,
                            purchaseDate: prediction.date?.value || 'Date Unknown',
                            purchaseTime: prediction.time?.value || 'Time Unknown',
                            summary: `${prediction.supplier_name?.value || 'Unknown Supplier'} - $${prediction.total_amount?.value || '0.00'} - ${prediction.date?.value || 'Date Unknown'} at ${prediction.time?.value || 'Time Unknown'}`,
                            lineItems: prediction.line_items?.map((item: { description: any; total_amount: any; }) => `${item.description}: $${item.total_amount}`).join(', ') || 'No line items'
                        });
                        //const formattedData = prepareDataForDatastore(prediction);
                        await postDataToDatastore(formattedData);
                    } else {
                        setError('Error processing document');
                    }
                } else {
                    setError('Error processing document');
                }
            } catch (error: any) {
                setError('Error processing document');
                console.error('Error processing document:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };
    const prepareDataForDatastore = (mindeeResponse: IMindeeResponse) => {
        // Extract necessary fields from the Mindee response
        const {
            documentType,
            date,
            time,
            supplierName,
            supplierAddress,
            totalAmount,
            lineItems,
        } = mindeeResponse;

        // Prepare the data structure for the Datastore
        let formattedData: { date: string | undefined; supplierName: string | undefined; lineItems: { totalAmount: number; description: string }[] | undefined; supplierAddress: string | undefined; totalAmount: number | undefined; documentType: string | undefined; time: string | undefined };
        formattedData = {
            documentType: documentType?.value,
            date: date?.value,
            time: time?.value,
            supplierName: supplierName?.value,
            supplierAddress: supplierAddress?.value,
            totalAmount: totalAmount?.value,
            lineItems: lineItems?.map(item => ({
                description: item.description,
                totalAmount: item.totalAmount,
            })),
            // Add any additional fields you need
        };

        return formattedData;
    };
    const postDataToDatastore = async (ocrData: { date: string | undefined; supplierName: string | undefined; lineItems: { totalAmount: number; description: string }[] | undefined; supplierAddress: string | undefined; totalAmount: number | undefined; documentType: string | undefined; time: string | undefined }) => {
        try {
            const docKey = nanoid();
            await setDoc({
                collection: "receipts",
                doc: {
                    key: docKey,
                    data: ocrData,
                    description: "OCR result for receipt"
                },
            });
            console.log("Data posted to Datastore successfully");
        } catch (error) {
            console.error("Error posting data to Datastore:", error);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            {filePreviewUrl && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                    <img src={filePreviewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </Box>
            )}
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                    Upload Receipt
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" component="span">
                            Choose File
                        </Button>
                    </label>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUploadAndRecognize}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Upload'}
                    </Button>
                </Box>
            </Paper>

            {error && (
                <Typography color="error">{error}</Typography>
            )}

            {ocrResult && (
                <Paper elevation={3} sx={{ padding: 2, width: '100%' }}>
                    <Typography variant="h6" textAlign="center">OCR Result:</Typography>
                    <Typography paragraph><strong>Summary:</strong> {ocrResult.summary}</Typography>
                    <Typography paragraph><strong>Line Items:</strong> {ocrResult.lineItems}</Typography>
                </Paper>
            )}
        </Box>
    );
};
export default FileUploadAndRecognize;


