import produce, { Draft } from "immer"
import { ISignUpState, SignUpActions, SignUpActionTypes } from "../../types/SignUpTypes"
import { LoadingState } from "../../types/TweetsTypes"



const initialState: ISignUpState = {
    data: undefined,
    loadingState: LoadingState.NEVER
}


export const signUpReducer = produce((draft: Draft<ISignUpState>, action: SignUpActions) => {
    switch (action.type) {

        case SignUpActionTypes.SET_SIGNUP_DATA:
            draft.data = action.payload
            draft.loadingState = LoadingState.SUCCESS
            break

        case SignUpActionTypes.SET_LOADING:
            draft.loadingState = action.payload
            break

        default:
            return draft
    }
}, initialState)