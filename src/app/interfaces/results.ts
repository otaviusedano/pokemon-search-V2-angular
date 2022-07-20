export interface results {
  count: number
  results?: [resultsData]
  next: string
  previous: string
  pokemons: number[] | undefined
}

export interface resultsData {
  name: string
  url: string
}