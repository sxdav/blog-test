import { StatusEnum } from "./enums"



export interface FetchArticlesState {
    articles: Article[],
    status: StatusEnum
}
export interface AddedArticlesState {
    articles: Article[]
}
export interface Article {
    title: string,
    cover: string,
    text: string,
    author: string,
    categorie: string
}