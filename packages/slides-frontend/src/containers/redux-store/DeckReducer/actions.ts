import {
    ADD_SLIDE,
    REMOVE_SLIDE,
    CLONE_SLIDE,
    CHANGE_SLIDE,
    ADD_ITEM,
    REMOVE_ITEM,
    CHANGE_ITEM_POSITION,
    CHANGE_ITEM_SIZE,
    EDIT_DATA,
    SET_EDIT_MODE,
    LOAD_DECK_STATE,
} from './constants';

import { position, size, Item, Deck } from './definitions';

export const addSlide = () => ({
    type: ADD_SLIDE,
}) as const;

export const removeSlide = () =>({
    type: REMOVE_SLIDE,
}) as const;

export const cloneSlide = () => ({
    type: CLONE_SLIDE,
}) as const;

export const changeSlide = (
    payload: {
        action: string,
        isFirstRendering: boolean,
        location: {
            hash: string,
            pathname: string,
            search: string,
            state: any
        }
    }) => ({
    type: CHANGE_SLIDE,
    payload,
}) as const;

export const addItem = (item: Item) => ({
    type: ADD_ITEM,
    item,
}) as const;

export const removeItem = (id: string) => ({
    type: REMOVE_ITEM,
    id,
}) as const;

export const changeItemPosition = (id: string, pos: position) => ({
    type: CHANGE_ITEM_POSITION,
    id,
    position: pos,
}) as const;

export const changeItemSize = (id: string, siz: size) => ({
    type: CHANGE_ITEM_SIZE,
    id,
    size: siz,
}) as const;

export const editData = (id: string, data: string) => ({
    type: EDIT_DATA,
    id,
    data,
}) as const;

export const setEditMode = (id: string, edit: boolean) => ({
    type: SET_EDIT_MODE,
    id,
    edit,
}) as const;

export const loadDeckState = (state: Deck) => ({
    type: LOAD_DECK_STATE,
    state,
}) as const;

export type Action = ReturnType<
 typeof addSlide | typeof removeSlide | typeof cloneSlide | typeof changeSlide |
 typeof addItem | typeof removeItem | typeof changeItemPosition | typeof changeItemSize |
 typeof editData | typeof setEditMode | typeof loadDeckState
>
