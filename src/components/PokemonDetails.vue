<template>
  <div>
    <PulseLoader
      class="spinner-center-grid"
      :color="'#ef5350'"
      :loading="pokemons.isLoading"
    />
  </div>
  <div v-show="pokemons.getPokemonNotFound" class="pokemon-not-found">
    <strong>
      ¡Pokemon no encontrado! Por favor, asegúrate de escribir el id del pokemon
      correctamente en la URL.
    </strong>
  </div>

  <div
    class="grid-center"
    v-if="!pokemons.isLoading && !pokemons.getPokemonNotFound"
  >
    <figure class="center">
      <img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemons.pokemonWithDetails.id}.png`"
      />
    </figure>
    <div></div>
    <h2 class="center">ID: {{ pokemons.pokemonWithDetails.id }}</h2>
    <h2 class="center">Nombre: {{ pokemons.pokemonWithDetails.name }}</h2>
    <h2 class="center">
      Experiencia base: {{ pokemons.pokemonWithDetails.base_experience }}
    </h2>
    <h2 class="center">Altura: {{ pokemons.pokemonWithDetails.height }}</h2>
    <h2 class="center">Peso: {{ pokemons.pokemonWithDetails.weight }}</h2>
  </div>
</template>

<script lang="ts">
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { usePokemonsStore } from "../stores/pokemonStore";
export default {
  components: {
    PulseLoader,
  },
  setup() {
    const pokemons = usePokemonsStore();

    return { pokemons };
  },
  created() {
    const pokemonId = this.$route.params.id;
    pokemonId ? this.pokemons.loadPokemonById(pokemonId.toString()) : "";
  },
};
</script>

<style scoped>
.grid-center {
  margin: 2rem 0 3rem;
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 0.5rem;
  justify-content: center;
}

.center {
  display: grid;
  justify-content: center;
}
</style>
