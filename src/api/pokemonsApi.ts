import axios from "axios";
const baseUrl = `https://pokeapi.co/api/v2`;

const get20Pokemons = axios.create({
    baseURL: `${baseUrl}/pokemon?limit=20`,
});

const searchPokemon = axios.create({
    baseURL: `${baseUrl}/pokemon/`,
});

const filterPokemon = axios.create({
    baseURL: `${baseUrl}/`,
});

export { get20Pokemons, searchPokemon, filterPokemon };
