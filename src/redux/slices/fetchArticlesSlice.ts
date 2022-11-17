import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Article, FetchArticlesState } from "../../types/interfaces";
import { CategoriesEnum, StatusEnum } from "../../types/enums";

import { loremIpsum } from "lorem-ipsum";



export const fetchArticles = createAsyncThunk<any, number | 'All', {rejectValue: string}>(
    'fetchArticles/fetchArticles',
    async (amountOfFetchedArticles) => {
        return await new Promise((resolve) => {
            setTimeout(() => {
                let returnArr: Article[] = [];
    
                for (let i = 0; i < (amountOfFetchedArticles === 'All' ? 10 : amountOfFetchedArticles); i++) {
                    const categories = Object.keys(CategoriesEnum);
                    const category = categories[Math.floor(Math.random() * (4 - 0)) + 0]
    
                    const a: Article = {
                        title: loremIpsum({
                            count: 1,
                            sentenceLowerBound: 3,   
                            sentenceUpperBound: 6,
                            suffix: '',
                        }),
                        cover: category,
                        text: loremIpsum({
                            count: 3,
                            sentenceLowerBound: 4,   
                            sentenceUpperBound: 16,
                            paragraphLowerBound: 2,
                            paragraphUpperBound: 4,
                            units: "paragraphs",
                            suffix: '',
                        }),
                        author: loremIpsum({
                            count: 1,
                            sentenceLowerBound: 2,   
                            sentenceUpperBound: 2,
                            suffix: '',
                        }),
                        category: category
                    };
    
                    returnArr = [...returnArr, a];
                }
    
                resolve(returnArr);
    
            }, 2000)
        }).then(resp => {
            return resp
        })
    }
)

export const initialState: FetchArticlesState = {
    amountOfFetchedArticles: 10,
    amountOfAllArticles: 50,
    fetchedArticles: [],
    status: StatusEnum.SUCCESS
}
export const fetchArticlesSlice = createSlice ({
    name: 'fetchArticles',
    initialState,
    reducers: {
        setAmountOfFetchedArticles(state, action) {
            state.amountOfFetchedArticles = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.status = StatusEnum.LOADING;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.fetchedArticles = [...state.fetchedArticles, ...action.payload];
                state.status = StatusEnum.SUCCESS;
            })
    }
})



export const { setAmountOfFetchedArticles } = fetchArticlesSlice.actions;