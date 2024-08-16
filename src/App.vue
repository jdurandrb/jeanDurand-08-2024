<template>
  <div id="app">
    <NavBar :navLinks="navLinks" />
    <router-view />
    <LoadingScreen v-if="pokemonStore.isLoadingPokemons" />
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import LoadingScreen from "./components/LoadingScreen.vue";

import { usePokemonStore } from '@/pokemon/store';
const pokemonStore = usePokemonStore();

const navLinks = [
  { name: "Home", path: "/" },
  { name: "My Team", path: "/team" },
];
</script>

<style>
html {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
html::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
