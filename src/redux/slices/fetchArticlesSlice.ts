import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Article, FetchArticlesState } from "../../types/interfaces";
import { CategoriesEnum, StatusEnum } from "../../types/enums";

import { loremIpsum } from "lorem-ipsum";


export const fetchArticles = createAsyncThunk<any, undefined, {rejectValue: string}>(
    'fetchArticles/fetchArticles',
    async (_, {rejectWithValue}) => {
        return await new Promise((resolve) => {
            setTimeout(() => {
                let returnArr: Article[] = [];
    
                for (let i = 0; i < 50; i++) {
                    const categories = Object.keys(CategoriesEnum);
                    const categorie = categories[Math.floor(Math.random() * (5 - 0)) + 0]
    
                    const a: Article = {
                        title: loremIpsum({
                            count: 1,
                            sentenceLowerBound: 3,   
                            sentenceUpperBound: 6,
                            suffix: '',
                        }),
                        cover: categorie,
                        text: loremIpsum({
                            count: 3,
                            sentenceLowerBound: 4,   
                            sentenceUpperBound: 24,
                            paragraphLowerBound: 6,
                            paragraphUpperBound: 12,
                            units: "paragraphs",
                            suffix: '',
                        }),
                        author: loremIpsum({
                            count: 1,
                            sentenceLowerBound: 2,   
                            sentenceUpperBound: 2,
                            suffix: '',
                        }),
                        categorie: categorie
                    };
    
                    returnArr = [...returnArr, a];
                }
    
                resolve(returnArr);
    
            }, 3000)
        }).then(resp => {
            return resp
        })
    }
)

export const initialState: FetchArticlesState = {
    articles: [],
    status: StatusEnum.LOADING
}
export const fetchArticlesSlice = createSlice ({
    name: 'fetchArticles',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.status = StatusEnum.LOADING;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.articles = action.payload;
                state.status = StatusEnum.SUCCESS;
            })
    }
})