import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import format from '../helpers/format'
import { results } from '../interfaces/results';

@Injectable({
  providedIn: 'root'
})

export class PokedexService {
  private readonly urlApiToChain = "https://pokeapi.co/api/v2/"
  readonly urlApi = "https://pokeapi.co/api/v2/pokemon/"
  format: any
  error: any
  inputValue!: string
  results!: results
  pokemons: any[] = [];
  pokemonFiltered: any[] = [];
  evolutions: any[] = []
  firstPokemonOfChain: any[] = []

  constructor(private http: HttpClient) { }

  getByEvent($event: string) {
    this.inputValue = $event
  }

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
    
    return this.http.get(urlToGet);
  }

  getPokemonByName(pokemonName: any): Observable<any> {
    return this.http.get(this.urlApi + pokemonName)
  }

  getEvolutionChain(pokemonId: number)  {
    const justOneChain = this.firstPokemonOfChain.length < 1 || this.firstPokemonOfChain.length > 1
    if (justOneChain) {
      this.http.get(this.urlApiToChain + `pokemon-species/${pokemonId}`).subscribe((res: any) =>
        this.getEvolutionPokemons(res?.evolution_chain.url))
    }
  }

  getEvolutionPokemons(evolutionChainUrl: string) {
    
    this.http.get(evolutionChainUrl).subscribe((evolution: any) => {
      const evolutionsFormated = format.evolutions(evolution.chain)
      this.firstPokemonOfChain.push(evolutionsFormated.pokemon)
      this.generatePokemonEvolutions(evolutionsFormated)
    })
  }

  generatePokemonEvolutions(evolutions: any) {
    
    evolutions?.next?.map((evolution: any) => { 
      this.evolutions.push(evolution.pokemon)  

      this.generatePokemonEvolutions(evolution)
    })
  }

  filterPokemons() {
    if (this.pokemonFiltered.length > 0 || this.pokemonFiltered.length >= 1) {
      return this.pokemonFiltered
    }

    return this.pokemons.filter((pokemon) => {
      
      if (this.inputValue) {
        return pokemon.includes(this.inputValue)
      }
      
      return this.pokemons
    })
  }
}
