import { defineStore } from "pinia";
import type { Pokemon } from "../interfaces/pokemon";
import type { FilterValues } from "../interfaces/filterValues";
import type { PokemonDetails } from "../interfaces/pokemonDetails";
import {
  get20Pokemons,
  searchPokemon,
  filterPokemon,
} from "../api/pokemonsApi";

const mapPokemon = (pokemon: Pokemon, id: number) => {
  return {
    id,
    name: pokemon.name,
    url: pokemon.url,
  };
};

const filterByType: FilterValues[] = [
  { option: "Monstruo", value: "monster" },
  { option: "Insecto", value: "bug" },
  { option: "Volador", value: "flying" },
  { option: "Dragon", value: "dragon" },
  { option: "Planta", value: "plant" },
];

const filterByHabitat: FilterValues[] = [
  { option: "Cueva", value: "cave" },
  { option: "Bosque", value: "forest" },
  { option: "Ciudad", value: "urban" },
  { option: "Oceano", value: "sea" },
];

const filterByRate: FilterValues[] = [
  { option: "Lento", value: "slow" },
  { option: "Medio", value: "medium-slow" },
  { option: "Rapido", value: "fast" },
];

interface PokemonState {
  pokemonList: Pokemon[];
  pokemonListCopy: Pokemon[];
  loadingPokemons: boolean;
  pokemonsCurrentOffset: number;
  pokemonNotFound: boolean;
  pokemonFilterOptions: string;
  pokemonFilterValue: string;
  pokemonFilterValues: FilterValues[];
  pokemonWithDetails: PokemonDetails[];
}

export const usePokemonsStore = defineStore("pokemon", {
  state: (): PokemonState => ({
    pokemonList: [],
    loadingPokemons: false,
    pokemonsCurrentOffset: 0,
    pokemonListCopy: [],
    pokemonNotFound: false,
    pokemonFilterOptions: "",
    pokemonFilterValue: "",
    pokemonFilterValues: [],
    pokemonWithDetails: [],
  }),

  actions: {
    loadPokemons() {
      // vaciamos la copia cada vez que carguemos nuevos pokemons para que
      // se rellene al buscar (funcion loadSearchedPokemon)
      this.setPokemonCopy([]);
      this.setPokemonNotFound(false);
      this.setLoading(true);
      get20Pokemons
        .get("", { params: { offset: this.pokemonsCurrentOffset } })
        .then(({ data }: any) => {
          const { results } = data;
          //Si es la primera vez que realizamos esta llamada (inicio),
          //le asignamos directamente el array que recibimos de la request mapeado.
          //Sino, le concatenamos el valor que ya tenía con la respuesta de la nueva request (offset > 0)

          const resultsMapped = results.map((pokemon: Pokemon) => {
            const id = this.getPokemonIdFromUrl(pokemon.url);
            return mapPokemon(pokemon, id);
          });
          if (this.pokemonsCurrentOffset === 0) {
            return this.setPokemonList(resultsMapped);
          }
          const pokemonListConcat = this.pokemonList.concat(resultsMapped);
          return this.setPokemonList(pokemonListConcat);
        })
        .catch(() => {
          this.setLoading(false);
          this.setPokemonNotFound(true);
        });

      this.setLoading(false);
    },
    getPokemonIdFromUrl(url: string) {
      const urlSplitted = url.toString().split("/");
      const pokemonIdString = urlSplitted[urlSplitted.length - 2];
      const id = pokemonIdString ? parseInt(pokemonIdString, 10) : 0;
      return id;
    },
    load20MorePokemons() {
      this.pokemonsCurrentOffset += 20;
      this.pokemonListCopy.length
        ? this.setPokemonList(this.pokemonListCopy)
        : "";
      this.loadPokemons();
    },
    loadSearchedPokemon(searchedPokemon: string) {
      if (!searchedPokemon || searchedPokemon.trim().length === 0) {
        return;
      }

      this.setPokemonNotFound(false);
      // Si no existe una copia de los pokemons, la creamos a partir de la que hay
      // antes de realizar la búsqueda de pokemons.
      !this.pokemonListCopy.length ? this.setPokemonCopy(this.pokemonList) : "";
      const foundPokemon = this.pokemonList.filter(
        (pokemon) => pokemon.name === searchedPokemon
      );
      if (foundPokemon.length === 0) {
        this.setLoading(true);
        searchPokemon
          .get(searchedPokemon)
          .then(({ data }: any) => {
            this.setLoading(false);
            this.setPokemonList([]);
            const { id } = data;
            const pokemonMapped = mapPokemon(data, id);
            this.pokemonList.push(pokemonMapped);
            return this.pokemonList;
          })
          .catch(() => {
            this.setLoading(false);
            this.setPokemonList(this.pokemonListCopy);
            return this.setPokemonNotFound(true);
          });
      }

      this.setPokemonList(foundPokemon);
    },
    loadfilteredPokemon() {
      if (!this.pokemonFilterOptions && !this.pokemonFilterValue) {
        return;
      }
      this.setPokemonNotFound(false);
      !this.pokemonListCopy.length ? this.setPokemonCopy(this.pokemonList) : "";

      this.setLoading(true);
      this.setPokemonList([]);
      filterPokemon
        .get(`/${this.pokemonFilterOptions}/${this.pokemonFilterValue}`)
        .then(({ data }: any) => {
          this.setLoading(false);
          const { pokemon_species } = data;

          const pokemonsMapped = pokemon_species.map((pokemon: Pokemon) => {
            const id = this.getPokemonIdFromUrl(pokemon.url);
            return mapPokemon(pokemon, id);
          });
          const pokemonsMappedSorted = pokemonsMapped.sort(
            (pokeA: Pokemon, pokeB: Pokemon) => pokeA.id - pokeB.id
          );
          return this.setPokemonList(pokemonsMappedSorted);
        })
        .catch(() => {
          this.setLoading(false);
          this.setPokemonList(this.pokemonListCopy);
          return this.setPokemonNotFound(true);
        });
    },
    undoSearch() {
      this.pokemonListCopy.length
        ? this.setPokemonList(this.pokemonListCopy)
        : "";
      this.setPokemonNotFound(false);
    },
    loadPokemonById(id: string) {
      this.setPokemonNotFound(false);

      this.setLoading(true);
      searchPokemon
        .get(id)
        .then(({ data }: any) => {
          this.setLoading(false);
          this.setPokemonDetails(data);
        })
        .catch(() => {
          this.setLoading(false);
          return this.setPokemonNotFound(true);
        });
    },
    setLoading(loading: boolean) {
      this.loadingPokemons = loading;
    },
    setPokemonList(pokemons: Pokemon[]) {
      this.pokemonList = pokemons;
    },
    setPokemonCopy(pokemons: Pokemon[]) {
      this.pokemonListCopy = pokemons;
    },
    setPokemonNotFound(pokemon: boolean) {
      this.pokemonNotFound = pokemon;
    },
    setPokemonFilterOptions(option: FilterValues) {
      switch (option.value) {
        case "egg-group":
          this.pokemonFilterValues = filterByType;
          break;
        case "pokemon-habitat":
          this.pokemonFilterValues = filterByHabitat;
          break;
        case "growth-rate":
          this.pokemonFilterValues = filterByRate;
          break;
      }
      this.pokemonFilterOptions = option.value;
    },
    setPokemonFilterValue(value: any) {
      this.pokemonFilterValue = value.value;
    },
    setPokemonDetails(details: PokemonDetails[]) {
      this.pokemonWithDetails = details;
    },
  },
  getters: {
    getPokemonList: (state) => state.pokemonList,
    isLoading: (state) => state.loadingPokemons,
    getPokemonNotFound: (state) => state.pokemonNotFound,
  },
});
