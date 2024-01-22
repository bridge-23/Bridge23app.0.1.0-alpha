//../src/state/atoms.ts
import {atom} from "recoil";
import {AccountData, MagicListItem, MagicList, AccountCardType, ExpenseItem, IncomeItem} from "../types";
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
export const IncomeState = atom<IncomeItem[]>({
    key: 'IncomeState',
    default: [],
});
export const ExpenseState = atom<ExpenseItem[]>({
    key: 'ExpenseState',
    default: [],
});
