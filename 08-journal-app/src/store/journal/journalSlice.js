import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // acive:{
        //     id:123,
        //     title:'',
        //     body:'',
        //     date:123456,
        //     imageUrls:[],
        // }
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes = [
                ...state.notes,
                action.payload
            ];
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.isSaving = false;
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, { payload }) => {
            state.notes = [...payload]
        },
        setSaving: (state) => {
            state.isSaving = true;
            // Mensaje de error
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload;
                }
                return note;
            });
            //Mesnaje de actualizacion
            state.messageSaved = `${action.payload.title}, actualizada correctamente`
        },
        setPhotostToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            state.active = null,
            state.notes=state.notes.filter( note => note.id !== action.payload )
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    setPhotostToActiveNote,
    clearNotesLogout,
} = journalSlice.actions