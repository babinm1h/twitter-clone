import { Dispatch } from "react";
import { ILoginData } from "../../components/LoginPage/LoginModal/LoginModal";
import { ISignUpForm } from "../../components/LoginPage/SignUpForm/SignUpModal";
import { AuthApi } from "../../services/api/auth";
import { ISetSignupDataAction, ISetSignupLoadingAction, SignUpActions, SignUpActionTypes } from "../../types/SignUpTypes";
import { LoadingState } from "../../types/TweetsTypes";
import { IDBUser } from "../../types/UserTypes";



export const setSignUpData = (payload: IDBUser): ISetSignupDataAction => ({ type: SignUpActionTypes.SET_SIGNUP_DATA, payload })

export const setSignUpLoading = (payload: LoadingState): ISetSignupLoadingAction => ({ type: SignUpActionTypes.SET_LOADING, payload })



// ============================================ THUNKS

export const signUp = (payload: ISignUpForm) => {
    return async (dispatch: Dispatch<SignUpActions>) => {
        try {
            dispatch(setSignUpLoading(LoadingState.LOADING))
            const res = await AuthApi.signUp(payload)
            dispatch(setSignUpData(res.data.data))
        } catch (err) {
            dispatch(setSignUpLoading(LoadingState.ERROR))
        }
    }
}