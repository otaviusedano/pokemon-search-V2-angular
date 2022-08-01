export interface results {
  count: number
  results: [resultsData]
  next: string
  previous: string
  pokemons: string[]
}

export interface resultsData {
  name: string
  url: string
}