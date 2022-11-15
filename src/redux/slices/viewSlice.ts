import { createSlice } from "@reduxjs/toolkit";
import { ViewEnum } from "../../types/enums";

import { ViewState } from "../../types/interfaces";



const initialState: ViewState = {
    view: ViewEnum.Pagination
}
export const viewSlice = createSlice ({
    name: 'view',
    initialState,
    reducers: {
        setView(state, action) {
            state.view = action.payload;
        }
    }
})



export const { setView } = viewSlice.actions;