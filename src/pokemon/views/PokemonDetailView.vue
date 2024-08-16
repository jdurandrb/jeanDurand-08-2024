<template>
  <div class="pokemon-detail-container" v-if="pokemon">
    <button class="back-button" @click="backToTeam">Back to Team</button>
    <PokemonDetailList
      :pokemon="pokemon"
      :abilities="pokemon.abilities"
      :baseExperience="pokemon.base_experience"
      @removeFromTeam="removeFromTeam"
    />
  </div>
    <LoadingScreen v-else />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTeamStore } from "@/team/store/";
import { usePokemon } from '@/pokemon/composables/usePokemon';
import PokemonDetailList from '@/pokemon/components/PokemonDetailList.vue';
import LoadingScreen from "@/components/LoadingScreen.vue";

const route = useRoute();
const router = useRouter();

const teamStore = useTeamStore();
const { getPokemonDetails } = usePokemon();
const pokemon = ref<any>(null);
const evolutionChain = ref<any[]>([]);
const pokemonSound = ref<string>('');

const backToTeam = () => {
  router.push('/team');
};

const removeFromTeam = (pokemon: Pokemon) => {
  teamStore.removeFromTeam(pokemon);
};

onMounted(async () => {
  const id = route.params.id as string;
  pokemon.value = await getPokemonDetails(parseInt(id));
  
  // Load Pokémon sound (cries)
  pokemonSound.value = `https://pokemoncries.com/cries/${id}.mp3`;
});
</script>

<style scoped>
.pokemon-detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
  transition: all 0.3s ease-in-out;
}

.pokemon-detail-container:hover {
  transform: translateY(-5px);
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5em;
  color: #555;
}

.pokemon-detail-container h2 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 10px;
}

.pokemon-detail-container ul {
  list-style: none;
  padding: 0;
}

.pokemon-detail-container li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.pokemon-detail-container li img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: #eee;
}

.pokemon-detail-container audio {
  margin-top: 20px;
  width: 100%;
}

/* Styles for the back button */
.back-button {
  align-self: flex-start;
  background-color: #DAEBFC;
  color: #243349;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 20px;
}

.back-button:hover {
  background-color: #243349;
  color: #DAEBFC;
}
</style>
