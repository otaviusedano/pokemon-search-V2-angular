import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { catchError, map, Observable, Subscription, Subject, empty } from 'rxjs'

import format from 'src/app/helpers/format'
import { PokemonData } from 'src/app/interfaces/pokemon'
import { PokedexService } from 'src/app/services/pokedex.service'
import { Evolutions, EvolutionsData } from 'src/app/interfaces/evolutions'
import { StatsFormed } from 'src/app/interfaces/stats'
import { SpecieFromApi } from 'src/app/interfaces/species'
import { ChainFromApi } from 'src/app/interfaces/chain'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  format: any = format
  evolutions: Evolutions[] = []
  pokemonName!: string
  stats!: StatsFormed[]
  pokemonSubscribe!: Subscription
  pokemon!: PokemonData
  pokemon$!: Observable<PokemonData>
  error$ = new Subject<boolean>()

  constructor(
    private route: ActivatedRoute,
    private service: PokedexService,
  ) {}

  ngOnInit(): void {
    this.getPokemonsDetails()
  }

  getEvolutionChain(pokemonId: number): void  {
    const isExistEvolutions = this.evolutions.length > 0

    if (!isExistEvolutions) {
      this.service.getPokemonSpecies(pokemonId).subscribe((res: SpecieFromApi) =>
        this.getEvolutionPokemons(res.evolution_chain.url))
    }
  }

  getEvolutionPokemons(evolutionChainUrl: string): void {
    this.service.getEvolutionChain(evolutionChainUrl).subscribe((evolution: ChainFromApi) => {

      const evolutionsFormated = format.evolutions(evolution.chain)
      this.evolutions.push(evolutionsFormated.pokemon)

      this.generatePokemonEvolutions(evolutionsFormated)
    })
  }

  generatePokemonEvolutions(evolutions: EvolutionsData): void {
    evolutions?.next?.map((evolution: EvolutionsData) => {

      this.evolutions.push(evolution.pokemon)

      this.generatePokemonEvolutions(evolution)
    })
  }

  getPokemonsDetails(): void {
    this.route.params.subscribe((params) => {
      this.pokemonName = params['pokemon.name']
      this.pokemon$ = this.service.getPokemonByName(this.pokemonName).pipe(
        map((pokemon: PokemonData) => {
          this.pokemon = pokemon
          this.getEvolutionChain(pokemon.id)
          this.stats = this.format.stats(this.pokemon)
          return pokemon
      }), catchError((_) => {
        this.error$.next(true)
        return empty()
      }))
    })
  }
}
