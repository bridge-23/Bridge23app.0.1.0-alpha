//..src/types/index.ts
import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};
export interface AccountData {
    accountName: string;
    financialInstitution: string;
    currentBalance: number;
    currency: string;
    id: string;
}

export interface AccountCardType  {
    accountName: string;
    financialInstitution: string;
    currentBalance: number;
    accountCurrency: string;
    onEdit: () => void;
};

export interface MagicListItem {
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
export interface IncomeItem {
    amount: number;
    id: string;
    name: string;
}
export interface ExpenseItem {
    amount: number;
    id: string;
    name: string;
}