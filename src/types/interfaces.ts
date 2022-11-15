import { CategoriesEnum, PagesEnum, StatusEnum, ViewEnum } from "./enums"



export interface NavigationState {
    page: PagesEnum,
    category: CategoriesEnum | null
}

export interface FetchArticlesState {
    amountOfFetchedArticles: number,
    fetchedArticles: Article[],
    status: StatusEnum
}
export interface AddedArticlesState {
    addedArticles: Article[]
}
export interface Article {
    title: string,
    cover: string,
    text: string,
    author: string,
    category: string
}

export interface ViewState {
    view: ViewEnum
}