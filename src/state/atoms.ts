//../src/state/atoms.ts
import {atom} from "recoil";
import {AccountData, MagicListItem, MagicList, AccountCardType, totalExpenses, totalIncomes, TransactionData} from "../types";
export const magicListItemState = atom<Partial<MagicListItem>[]>({
    key: 'itemState',
    default: [],
});
export const magicListsState = atom<Partial<MagicList>[]>({
    key: 'magicListsState',
    default: [],
});
export const accountDataState = atom<AccountData[]>({
    key: 'accountDataState',
    default: [],
});
export const AccountCardState = atom<Partial<AccountCardType>[]>({
    key: 'accountInfoState',
    default: [],
});
export const totalIncomesState = atom<Partial<totalIncomes[]>>({
    key: 'totalIncomeState',
    default: [],
});
export const totalExpenseState = atom<Partial<totalExpenses[]>>({
    key: 'totalExpenseState',
    default: [],
});
export const TransactionDataState = atom<TransactionData[]>({
    key: 'TransactionDataState',
    default: [],
});