import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { PokemonToSearch } from '../interfaces/pokemon'

@Injectable({
  providedIn: 'root'
})

export class PokedexService {
  private readonly urlApiToChain = "https://pokeapi.co/api/v2/"
  private readonly urlApi = "https://pokeapi.co/api/v2/pokemon/"
  private readonly firstFetchUrlApi = this.urlApi + '?offset=0&limit=20'
  private readonly lastFetchUrlApi = this.urlApi + '?offset=1128&limit=20'
  error: Error | undefined
  nextPage!: string
  previousPage!: string
  pokemonFiltered!: PokemonToSearch[]

  constructor(private http: HttpClient) { }

  setPage(page: string): Observable<any> {

    let urlToGet: string = ''

    switch (page) {
      case 'next':
        urlToGet = this.nextPage
      break

      case 'prev':
        urlToGet = this.previousPage
      break

      case 'lastPage':
        urlToGet = this.lastFetchUrlApi
      break

      case 'init':
        urlToGet = this.firstFetchUrlApi
      break
    }

    return this.http.get(urlToGet)
  }

  resetPokemonFiltered(): void {
    this.pokemonFiltered = []
  }

  resetError(): void {
    this.error = undefined
  }

  getPokemonByName(pokemonName: string): Observable<any> {
    return this.http.get(this.urlApi + pokemonName)
  }

  getPokemonSpecies(pokemonId: number): Observable<any> {
    return this.http.get(this.urlApiToChain + `pokemon-species/${pokemonId}`)
  }

  getEvolutionChain(evolutionChainUrl: string): Observable<any> {
    return this.http.get(evolutionChainUrl)
  }
}
