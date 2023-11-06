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