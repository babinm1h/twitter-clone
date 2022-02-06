import produce, { Draft } from "immer";
import { IProfileState, ProfileActions, ProfileActionTypes } from "../../types/ProfileTypes";
import { LoadingState } from "../../types/TweetsTypes";
import { IDBUser } from "../../types/UserTypes";

const initialState: IProfileState = {
    data: undefined,
    loadingState: LoadingState.NEVER
}

export const profileReducer = produce((draft: Draft<IProfileState>, action: ProfileActions) => {

    switch (action.type) {

        case ProfileActionTypes.SET_DATA:
            draft.data = action.payload
            draft.loadingState = LoadingState.LOADED
            break

        case ProfileActionTypes.SET_LOADING:
            draft.loadingState = action.payload
            break

        default:
            return draft
    }


}, initialState)