//../types/index.ts
import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};
export interface Account {
    accountName: string;
    currentBalance: number;
    currency: string;
    type: string; // Corresponds to accountType
    id: string;
}
export interface AccountInfo {
    userId: string; // or number, depending on the type of your user key
    accountName: string;
    financialInstitution: string;
    initialBalance: number;
    currentBalance: number;
    currency: string;
    accountType: string;
    created: string; // If you're storing the date as an ISO string
    // Add any other fields that you might have
}