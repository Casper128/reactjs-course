import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, updateNote, setSaving, setPhotostToActiveNote, deleteNoteById } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";
import { LocalFireDepartment } from "@mui/icons-material";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        //uid
        dispatch(savingNewNote());
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }
        //de este modo se puede apuntar al path de firestore
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const staertLoadingNotes = (uid = '') => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const notesList=await loadNotes(uid);
        dispatch(setNotes(notesList))
    }
}

export const startSaveNote=()=>{
    return async(dispatch, getState)=>{
        const {uid}= getState().auth;
        const {active: note}= getState().journal;
        const noteToFireStore = {...note};
        delete noteToFireStore.id;
        const docRef= doc(FirebaseDB, `${uid }/journal/notes/${note.id}`)
        await setDoc(docRef, noteToFireStore, {merge: true})
        dispatch(updateNote(note))
    }
}
export const startUploadingFiles=(files=[])=>{
    return async(dispatch)=>{
        dispatch(setSaving());
    // await fileUpload(files[0]);
    const fileUploadPromises=[];
    for (const file of files) {
        fileUploadPromises.push(fileUpload(file));
    }
    const photosUrls=await Promise.all(fileUploadPromises);
    dispatch(setPhotostToActiveNote(photosUrls));    
    }
}

export const startDeletingNote=()=>{
    return async (state, getState, dispatch)=>{
        const { uid }= getState().auth;
        const {active: note}=  getState().journal;
        const docRef= doc(FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id));
    } 
}