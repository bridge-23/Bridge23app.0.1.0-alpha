//../src/state/atoms.ts
import {atom} from "recoil";
import {Account, AccountInfo, MagicListItem, MagicList} from "../types";

export const magicListItemState = atom<Partial<MagicListItem>[]>({
    key: 'itemState',
    default: [],
});
export const magicListsState = atom<Partial<MagicList>[]>({
    key: 'magicListsState',
    default: [],
});


