import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAuth } from './config'
const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            //user Info
            displayName, email, photoURL, uid
        }
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.errorMessage;
        return {
            ok: true,
            errorMessage,
        }
    }
}
export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
        // al llamar esta funcion automaticamente ser logeado
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user;
        //TODO: actualizar el usuario displayName en Firebase
        await updateProfile(FirebaseAuth.currentUser, { displayName })
        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}


export const loginWithEmailPassword = async ({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, displayName, photoURL } = resp.user;
        return {
            ok: true,
            uid, email ,displayName, photoURL
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase=async()=>{
    return await FirebaseAuth.signOut();
}