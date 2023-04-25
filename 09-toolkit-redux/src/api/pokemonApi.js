import axios from "axios";

export const pokemonApi = axios.create ({
    baseURL:'https://pokeapi.co/api/v2'
});



      // const resp=await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}`)
        // const data=await resp.json();