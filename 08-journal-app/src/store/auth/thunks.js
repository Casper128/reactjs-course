import { singInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

// en los thunks es donde se deben hacer los dispacht
export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}
export const startGoogleSignIn = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await singInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await registerUserWithEmailPassword({ email, password, displayName });
        const { errorMessage } = result
        if (!result.ok) return dispatch(logout({ errorMessage }));
        dispatch(login(result))
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await loginWithEmailPassword({ email, password })
        const { errorMessage } = result
        if (!result.ok) return dispatch(logout({ errorMessage }));
        dispatch(login(result))
    }
}

export const startLogout = ()=>{
    return  (async (dispatch)=>{
        await logoutFirebase();
        dispatch(logout())
    })
}