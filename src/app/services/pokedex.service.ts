import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { results } from '../interfaces/results'

@Injectable({
  providedIn: 'root'
})  

export class PokedexService {
  private readonly urlApiToChain = "https://pokeapi.co/api/v2/"
  private readonly urlApi = "https://pokeapi.co/api/v2/pokemon/"
  private readonly firstFetchUrlApi = this.urlApi + '?offset=0&limit=20'
  private readonly lastFetchUrlApi = this.urlApi + '?offset=1128&limit=20'
  error: Error | undefined
  results!: any
  pokemonFiltered!: string[]

  constructor(private http: HttpClient) { }

  setPage(page: string): Observable<any> {

    let urlToGet = ''

    switch (page) {
      case 'next':
        urlToGet = this.results.next
      break

      case 'prev':
        urlToGet = this.results.previous
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

  getPokemonByName(pokemonName: any): Observable<any> {
    return this.http.get(this.urlApi + pokemonName)
  }

  getPokemonSpecies(pokemonId: number): Observable<any> {
    return this.http.get(this.urlApiToChain + `pokemon-species/${pokemonId}`)
  }

  getEvolutionChain(evolutionChainUrl: string): Observable<any> {
    return this.http.get(evolutionChainUrl)
  }
}
