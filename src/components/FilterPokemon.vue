<template>
  <div class="space-between-selectors">
    <vSelect
      :options="pokemonOptions"
      label="option"
      :reduce="(option) => option.value"
      placeholder="Seleccionar filtro"
      @option:selected="pokemons.setPokemonFilterOptions"
    />
    <vSelect
      :options="pokemons.pokemonFilterValues"
      label="option"
      :reduce="(option) => option.value"
      :disabled="!pokemons.pokemonFilterOptions"
      @option:selected="pokemons.setPokemonFilterValue"
      placeholder="Seleccionar valor"
    >
    </vSelect>
    <button class="old-school" @click="pokemons.loadfilteredPokemon">
      <span class="btn"><i class="fa fa-search"></i></span>
    </button>
    <button class="old-school" @click="pokemons.undoSearch()">
      <span class="btn"> <i class="fa fa-undo"></i></span>
    </button>
  </div>
</template>

<script lang="ts">
import vSelect from "vue-select";
import { usePokemonsStore } from "../stores/pokemonStore";

export default {
  components: {
    vSelect,
  },
  setup() {
    const pokemons = usePokemonsStore();
    const pokemonOptions = [
      { option: "Tipo", value: "egg-group" },
      { option: "Habitat", value: "pokemon-habitat" },
      { option: "Tasa de crecimiento", value: "growth-rate" },
    ];

    return {
      pokemons,
      pokemonOptions,
    };
  },
};
</script>

<style scoped>
.space-between-selectors {
  display: grid;
  grid-template-columns: 35% 35% 10% 10%;
  grid-gap: 0.5rem;
  align-items: center;
}
</style>
