//../src/state/atoms.ts
import {atom} from "recoil";
import {AccountData, MagicListItem, MagicList, ExpenseItem, IncomeItem} from "../types";
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
export const incomeState = atom<IncomeItem[]>({
    key: 'incomeState',
    default: [],
});
export const expenseState = atom<ExpenseItem[]>({
    key: 'expenseState',
    default: [],
});
export const avatarUrlState = atom({
    key: 'avatarUrlState',
    default: '',
})