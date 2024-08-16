import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTeamStore = defineStore('teamStore', () => {
  const team = ref<Pokemon[]>([]);
  const addToTeam = (pokemon: Pokemon): void => {
    if (team.value.length < 6 && !team.value.some(p => p.id === pokemon.id)) {
      pokemon.isAdded = true;
      team.value.push(pokemon);
    }
  };

  const removeFromTeam = (pokemon: Pokemon): void => {
    pokemon.isAdded = false;
    team.value = team.value.filter(p => p.id !== pokemon.id);
  };

  // Use computed for reactive properties
  const getTeam = computed(() => team.value);

  return {
    team: getTeam,
    addToTeam,
    removeFromTeam
  };
});
