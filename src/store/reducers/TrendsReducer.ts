import produce, { Draft } from "immer"
import { ITrendsState, TrendsActions, TrendsActionTypes } from "../../types/TrendsTypes"
import { LoadingState } from "../../types/TweetsTypes"



const initialState: ITrendsState = {
    items: [],
    loadingState: LoadingState.NEVER
}

export const trendsReducer = produce((draft: Draft<ITrendsState>, action: TrendsActions) => {
    switch (action.type) {

        case TrendsActionTypes.SET_TRENDS:
            draft.items = action.payload
            draft.loadingState = LoadingState.LOADED
            break

        case TrendsActionTypes.FETCH_TRENDS:
            draft.items = []
            draft.loadingState = LoadingState.LOADING
            break

        case TrendsActionTypes.SET_LOADING:
            draft.loadingState = action.payload
            break

        default:
            return draft

    }
}, initialState)