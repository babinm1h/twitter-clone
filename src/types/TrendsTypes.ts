import { LoadingState } from "./TweetsTypes";

export interface ITrendItem {
    name: string
    count: number
}

export interface ITrendsState {
    items: ITrendItem[]
    loadingState: any
}



export enum TrendsActionTypes {
    SET_TRENDS = "trends/SET_TRENDS",
    FETCH_TRENDS = "trends/FETCH_TRENDS",
    SET_LOADING = "trends/SET_LOADING",
}

export interface ISetTrendsAction {
    type: TrendsActionTypes.SET_TRENDS
    payload: ITrendItem[]
}
export interface IFetchTrendAction {
    type: TrendsActionTypes.FETCH_TRENDS
}
export interface ISetTrendsLoadingAction {
    type: TrendsActionTypes.SET_LOADING
    payload: LoadingState
}


export type TrendsActions = IFetchTrendAction | ISetTrendsAction | ISetTrendsLoadingAction