<template>
  <section class="pokedex">
    <div
      class="pokemon"
      v-for="pokemon in pokemons.getPokemonList"
      :key="pokemon.id"
      :tabindex="pokemon.id"
    >
      <div class="pokemon-id-chip">#{{ pokemon.id }}</div>
      <figure class="pokemon-figure">
        <img :src="`${imageUrl}${pokemon.id}.png`" :alt="pokemon.name" />
      </figure>
      <div class="pokemon-figure">
        <RouterLink
          :to="{ name: 'detalles', params: { id: pokemon.id } }"
          custom
          v-slot="{ navigate }"
          ><h1 class="pointer" @click="navigate">
            {{ pokemon.name }}
          </h1></RouterLink
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePokemonsStore } from "../stores/pokemonStore";
import { pokemonImageUrl } from "../assets/constants";
import { RouterLink } from "vue-router";
const pokemons = usePokemonsStore();
const imageUrl = pokemonImageUrl;
</script>

<style scoped>
.pokedex {
  padding: 1rem;
  display: grid;
  grid-gap: 3rem 2rem;
  grid-template-columns: repeat(auto-fill, 250px);
  justify-content: center;
}

.pokemon {
  background-color: #f2f2f2;
  overflow: hidden;
  position: relative;
}
.pokemon .pokemon-figure {
  text-align: center;
  margin-top: 1rem;
  color: #ef5350;
}
.pokemon-id-chip {
  background-color: #ef5350;
  color: #ffffff;
  width: 56px;
  height: 56px;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 10px 10px 0px;
  border-radius: 4px 0px 60px 0px;
  font-size: 1em;
}

.pointer {
  cursor: pointer;
}
</style>
