import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices/counter/counterSlice'
import { pokemonSlice } from './slices/pokemon'
import { todosApi } from './apis'


export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        pokemons: pokemonSlice.reducer,
        [todosApi.reducerPath]: todosApi.reducer,//propiedad computada
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(todosApi.middleware)
})
