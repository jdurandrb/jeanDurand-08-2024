<template>
  <div class="team-container">
    <h1 class="team-title">Your Pokémon Team</h1>
    <ul class="team-list">
      <li v-for="pokemon in team" :key="pokemon.id" class="team-list-item">
        <PokemonDetailList
          :pokemon="pokemon"
          @removeFromTeam="removeFromTeam"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useTeamStore } from "@/team/store/";
import { usePokemon } from "@/pokemon/composables/usePokemon";
import PokemonDetailList from "@/pokemon/components/PokemonDetailList.vue";

const teamStore = useTeamStore();
const team = computed(() => teamStore.team);
const { getPokemonDetails } = usePokemon();

onMounted(async () => {
  for (let i = 0; i < team.value.length; i++) {
    const details = await getPokemonDetails(team.value[i].id);
    team.value[i] = { ...team.value[i], ...details };
  }
});

const removeFromTeam = (pokemon: Pokemon) => {
  teamStore.removeFromTeam(pokemon);
};
</script>
<style scoped>
.team-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.team-title {
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
}

.team-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  list-style-type: none;
  padding: 0;
}

.team-list-item {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.team-list-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

@media (min-width: 600px) {
  .team-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .team-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
