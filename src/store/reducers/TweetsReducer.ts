import { ITweetsState, LoadingState } from "../../types/TweetsTypes"
import produce, { Draft } from "immer"


const initialState: ITweetsState = {
    items: [],
    loadingState: LoadingState.NEVER
}


export const TweetsReducer = produce((draft: Draft<ITweetsState>, action: any) => {
    
}, initialState)