import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { catchError, map, Observable, Subscription, Subject, empty } from 'rxjs'

import format from 'src/app/helpers/format'
import { PokemonData } from 'src/app/interfaces/pokemon'
import { PokedexService } from 'src/app/services/pokedex.service'
import { Evolutions, EvolutionsData, Varieties } from 'src/app/interfaces/evolutions'
import { StatsFormed } from 'src/app/interfaces/stats'
import { SpecieFromApi } from 'src/app/interfaces/species'
import { ChainFromApi } from 'src/app/interfaces/chain'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit, OnDestroy {
  format: any = format
  evolutions: Evolutions[] = []
  varieties: Varieties[] = []
  pokemonName!: string
  stats!: StatsFormed[]
  pokemonSubscribed!: Subscription
  speciesSubscribeds!: Subscription
  evolutionsSubscribeds!: Subscription
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

  ngOnDestroy(): void {
    this.pokemonSubscribed.unsubscribe()
    this.speciesSubscribeds.unsubscribe()
    this.evolutionsSubscribeds.unsubscribe()
  }

  getEvolutionChain(pokemonId: number): void  {
    const isExistEvolutions = this.evolutions.length > 0
    const pokemonIdGreaterThan1000 = pokemonId > 1000

    if (!pokemonIdGreaterThan1000) {
      this.speciesSubscribeds = this.service.getPokemonSpecies(pokemonId).subscribe((res: SpecieFromApi) => {

        const pokemonsVarietes = res.varieties.map((res) => res.pokemon)

        const pokemonsVarietesFiltereds = pokemonsVarietes.filter((res) =>
          res.name !== this.pokemon.name
        )

        this.varieties = pokemonsVarietesFiltereds

        if (!isExistEvolutions) {
          this.getEvolutionPokemons(res.evolution_chain.url)
        }
        })
    }
  }

  getEvolutionPokemons(evolutionChainUrl: string): void {
    this.evolutionsSubscribeds = this.service.getEvolutionChain(evolutionChainUrl).subscribe((evolution: ChainFromApi) => {
      const evolutionsFormated = format.evolutions(evolution.chain)
      const firstPokemonFromEvolutions = evolutionsFormated.pokemon

      this.evolutions.push(firstPokemonFromEvolutions)

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
    this.pokemonSubscribed = this.route.params.subscribe((params) => {
      this.pokemonName = params['pokemon.name']
      this.pokemon$ = this.service.getPokemonByName(this.pokemonName).pipe(
        map((pokemon: PokemonData) => {
          this.pokemon = pokemon
          this.getEvolutionChain(pokemon.id)
          this.stats = this.format.stats(this.pokemon)
          return pokemon
      }), catchError((_) => {
        console.log(_);
        
        this.error$.next(true)
        return empty()
      }))
    })
  }
}
