import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class PokedexService {
  readonly urlApiToChain = "https://pokeapi.co/api/v2/"
  readonly urlApi = "https://pokeapi.co/api/v2/pokemon/"
  readonly firstFetchUrlApi = this.urlApi + '?offset=0&limit=24'
  readonly lastFetchUrlApi = this.urlApi + '?offset=1128&limit=24'
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
        urlToGet = this.urlApi + '?offset=1128&limit=24'
      break

      case 'init':
        urlToGet = this.urlApi + '?offset=0&limit=24'
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
