export interface pokemonData {
  id: number
  name: string
  sprites: { 
    front_default: string 
  }
  evolutions: [evolutionsData]
  stats: any[]
}

export interface evolutionsData {
  next: evolutionsData[] | undefined
  pokemon: {
     name: string
  }
}

export interface evolutionData {
  evolves_to: any[]
  species: firstEvolutionData
}

export interface firstEvolutionData {
  name: string 
}

export interface pokemonTypes {
  types: pokemonType[]
}

export interface pokemonType {
  type: {
    name: string
  }
}

export interface pokemonStats {
  stats: pokemonStat[]
}

export interface pokemonStat {
  stat: {
    name: string
  }
  base_stat: number
}

