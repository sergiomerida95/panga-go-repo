<template>
  <div>
    <header>
      <button class="hovered-button">
        <RouterLink to="/"> Ir al Catálogo</RouterLink>
      </button>
    </header>
  </div>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>
