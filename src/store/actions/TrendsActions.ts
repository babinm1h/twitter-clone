import { Dispatch } from "react";
import { TrendsApi } from "../../services/api/trends";
import { IFetchTrendAction, ISetTrendsAction, ISetTrendsLoadingAction, ITrendItem, TrendsActions, TrendsActionTypes } from "../../types/TrendsTypes";
import { LoadingState } from "../../types/TweetsTypes";



export const fetchTrends = (): IFetchTrendAction => ({ type: TrendsActionTypes.FETCH_TRENDS })

export const setTrends = (payload: ITrendItem[]): ISetTrendsAction => ({ type: TrendsActionTypes.SET_TRENDS, payload })

export const setTrendsLoading = (payload: LoadingState): ISetTrendsLoadingAction => ({ type: TrendsActionTypes.SET_LOADING, payload })

// ============================================ THUNKS
export const fetchTrendsThunk = () => {
    return async (dispatch: Dispatch<TrendsActions>) => {
        try {
            dispatch(fetchTrends())
            const data = await TrendsApi.fetchTrends()
            dispatch(setTrends(data.data))
        } catch (e) {
            dispatch(setTrendsLoading(LoadingState.ERROR))
        }
    }
}