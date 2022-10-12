<template>
  <div class="input-wrapper">
    <input
      class="input"
      name="text"
      placeholder="Buscar Pokemon..."
      type="text"
      v-model="searchedPokemonValue"
    />
    <button
      class="old-school"
      @click="pokemons.loadSearchedPokemon(searchedPokemonValue)"
    >
      <span class="btn"><i class="fa fa-search"></i></span>
    </button>
    <button class="old-school" @click="pokemons.undoSearch()">
      <span class="btn"> <i class="fa fa-undo"></i></span>
    </button>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { usePokemonsStore } from "../stores/pokemonStore";

export default {
  props: {
    modelValue: String,
  },
  setup(props, { emit }) {
    const pokemons = usePokemonsStore();
    const searchedPokemonValue = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    return {
      searchedPokemonValue,
      pokemons,
    };
  },
};
</script>

<style scoped>
.input-wrapper input {
  background-color: #eee;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  width: 30%;
  border-radius: 1rem;
  color: lightcoral;
  box-shadow: 0 0.4rem #dfd9d9;
  margin: 1rem 1rem 1rem;
}

.input-wrapper input:focus {
  outline-color: lightcoral;
}
</style>
