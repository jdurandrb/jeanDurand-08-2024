import { createRouter, createWebHistory } from 'vue-router';
import PokemonHomeView from '@/pokemon/views/PokemonHomeView.vue';
import TeamView from '@/team/views/TeamView.vue';
import PokemonDetailView from '@/pokemon/views/PokemonDetailView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PokemonHomeView
  },
  {
    path: '/team',
    name: 'Team',
    component: TeamView
  },
  {
    path: '/team/:id',
    name: 'PokemonDetail',
    component: PokemonDetailView,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
