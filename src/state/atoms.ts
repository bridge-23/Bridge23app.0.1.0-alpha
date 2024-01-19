//../src/state/atoms.ts
import {atom} from "recoil";
import {AccountData, MagicListItem, MagicList, AccountCardType } from "../types";
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
