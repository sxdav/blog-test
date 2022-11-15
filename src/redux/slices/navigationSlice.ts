import { createSlice } from "@reduxjs/toolkit";

import { PagesEnum } from "../../types/enums";
import { NavigationState } from "../../types/interfaces";



const initialState: NavigationState = {
    page: PagesEnum.Articles,
    category: null
}
export const navigationSlice = createSlice ({
    name: 'navigation',
    initialState,
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },
        setCategory(state, action) {
            state.category = action.payload;
        }
    }
})



export const { setPage, setCategory } = navigationSlice.actions;