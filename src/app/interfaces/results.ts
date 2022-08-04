export interface PokemonsFromResults {
  name: string;
  url: string;
}

export interface ResultsFromApi {
  count: number;
  next: string;
  previous: string;
  results: PokemonsFromResults[];
}