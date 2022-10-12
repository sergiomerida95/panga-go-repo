<template>
  <div>
    <div class="space-between">
      <SearchPokemon v-model="searchedPokemon" />
      <FilterPokemon v-model="filteredPokemon" />
    </div>

    <div v-show="pokemons.getPokemonNotFound" class="pokemon-not-found">
      <strong>
        ¡Pokemon no encontrado! Por favor, asegúrate de escribir el nombre del
        pokemon completo.
      </strong>
    </div>
    <Pokemons />
    <div class="load-more-button">
      <PulseLoader
        class="spinner-center-grid"
        :color="'#ef5350'"
        :loading="pokemons.isLoading"
      />
      <button class="old-school" @click="pokemons.load20MorePokemons">
        <span class="btn">Cargar más Pokémons</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import SearchPokemon from "./SearchPokemon.vue";
import FilterPokemon from "./FilterPokemon.vue";
import { usePokemonsStore } from "../stores/pokemonStore";
import { ref } from "vue";
import Pokemons from "./Pokemons.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  components: {
    SearchPokemon,
    PulseLoader,
    Pokemons,
    FilterPokemon,
  },
  setup() {
    const pokemons = usePokemonsStore();
    const searchedPokemon = ref();
    const filteredPokemon = ref();
    pokemons.loadPokemons();
    return { searchedPokemon, pokemons, filteredPokemon };
  },
};
</script>

<style scoped>
.space-between {
  margin: 0 5rem 0;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 0.5rem;
  align-items: space-between;
  justify-content: center;
}
</style>
