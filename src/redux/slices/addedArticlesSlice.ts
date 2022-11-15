import { createSlice } from "@reduxjs/toolkit";

import { AddedArticlesState } from "../../types/interfaces";



const initialState: AddedArticlesState = {
    addedArticles: []
}
export const addedArticlesSlice = createSlice ({
    name: 'addedArticles',
    initialState,
    reducers: {
        addArticle(state, action) {
            state.addedArticles = [...state.addedArticles, action.payload];
        }
    }
})



export const { addArticle } = addedArticlesSlice.actions;