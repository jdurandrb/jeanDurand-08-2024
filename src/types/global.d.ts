interface PokemonType {
    type: {
        name: string;
    };
}

interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
    };
}

interface EvolutionChain {
    species: {
        name: string;
        url: string;
    };
    sprite: string;
}

interface Pokemon {
    name: string;
    url: string;
    id: number;
    response?: any;
    isAdded: boolean;
}

interface NavLink {
    name: string;
    path: string;
  }