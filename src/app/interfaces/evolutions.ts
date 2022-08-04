export interface EvolutionsData {
  next: EvolutionsData[] | undefined
  pokemon: {
     name: string
  }
}

export interface Evolutions {
  name: string
}

export interface FirstEvolutionData {
  name: string
  url: string
}

export interface EvolutionData {
  evolves_to: any[]
  species: FirstEvolutionData
}