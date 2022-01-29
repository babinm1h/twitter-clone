import { Dispatch } from "react";
import { TrendsApi } from "../../services/api/trends";
import { IFetchTrendAction, ISetTrendsAction, ITrendItem, TrendsActions, TrendsActionTypes } from "../../types/TrendsTypes";



export const fetchTrends = (): IFetchTrendAction => ({ type: TrendsActionTypes.FETCH_TRENDS })

export const setTrends = (payload: ITrendItem[]): ISetTrendsAction => ({ type: TrendsActionTypes.SET_TRENDS, payload })



// ============================================ THUNKS
export const fetchTrendsThunk = () => {
    return async (dispatch: Dispatch<TrendsActions>) => {
        try {
            dispatch(fetchTrends())
            const data = await TrendsApi.fetchTrends()
            dispatch(setTrends(data.data))
        } catch (e) {
            console.log(e);

        }
    }
}