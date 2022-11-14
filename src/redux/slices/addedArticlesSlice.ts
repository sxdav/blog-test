import { createSlice } from "@reduxjs/toolkit";

import { AddedArticlesState } from "../../types/interfaces";



const initialState: AddedArticlesState = {
    articles: []
}
export const addedArticlesSlice = createSlice ({
    name: 'addedArticles',
    initialState,
    reducers: {
        addArticle(state, action) {
            state.articles = action.payload
        }
    }
})



export const { addArticle } = addedArticlesSlice.actions;