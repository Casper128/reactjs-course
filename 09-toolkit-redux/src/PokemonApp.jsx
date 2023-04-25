import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPokemons } from "./store/slices/pokemon/thunks";
import { setPokemons } from "./store/slices/pokemon/pokemonSlice";

export const PokemonApp = () => {
    const dispatch = useDispatch();
    const { page, pokemons: dataPokemons= [], isLoading: Loading } = useSelector((state) => state.pokemons);

    useEffect(() => {
        dispatch(getPokemons())
    }, [])

    return (
        <>
            <h1>
                PokemonApp
            </h1>
            <hr />
            <span>Loading : {Loading ? 'True' : 'False'}</span>
            <ul>{
                dataPokemons.map((pokemon, index) =>
                    <li key={index}>{pokemon.name}</li>
                )
            }
            </ul>
            <button
                // disabled={isLoading}
                onClick={() => dispatch(getPokemons(page))}
            >
                Next
            </button>
        </>
    )
}
