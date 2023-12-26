//..src/types/index.ts
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
export interface Item {
    id: string;
    itemName: string;
    itemLink: string;
    description: string;
    price: number;
    currency: string;
    listId: string;
    listName: string;
    checked?: boolean;
    index: number;
}
export interface MagicList {
    id: string;
    name: string;
    owner: {
        userId: string;
    };
}