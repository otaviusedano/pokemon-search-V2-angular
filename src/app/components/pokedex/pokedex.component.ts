import { Component, HostListener, OnDestroy, OnInit } from '@angular/core'

import { Observable, of, Subscription } from 'rxjs'

import { PokedexService } from '../../services/pokedex.service'
import format from 'src/app/helpers/format'

import { PokemonsFromResults, ResultsFromApi } from 'src/app/interfaces/results'

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})

export class PokedexComponent implements OnInit, OnDestroy {
  format: any = format
  resultsSubscribed!: Subscription
  pokemonFromInput!: string
  count!: number
  pokemons$!: Observable<PokemonsFromResults[]>
  pokemonsCount$!: Observable<number>
  isHeaderLock: boolean = false

  constructor(private service: PokedexService) { }

  @HostListener('window:scroll', ['$event'])

  checkScroll(): void {
    if (window.scrollY > 200) {
      this.isHeaderLock = true;
    } else {
      this.isHeaderLock = false
    }
  }

  ngOnInit(): void {
    this.setPageTo('init')
  }

  ngOnDestroy(): void {
    this.resultsSubscribed.unsubscribe()
    this.service.resetPokemonFiltered()
  }

  getError(): Error | undefined {
    return this.service.error
  }

  getPokemonFromInput(pokemon: string): void {
    this.pokemonFromInput = pokemon
  }

  filterPokemons(pokemons: PokemonsFromResults[] ) {
    const justOnePokemonPerSearch = this.service.pokemonFiltered?.length > 0 || this.service.pokemonFiltered?.length >= 1
    if (justOnePokemonPerSearch) {
      return this.service.pokemonFiltered
    }

    return pokemons.filter(({name}) => {
      const pokemonName = name.toLocaleLowerCase()
      const isPokemonInclude = pokemonName.includes(this.pokemonFromInput)

      if (this.pokemonFromInput) {
        return isPokemonInclude
      } else {
        return name
      }
    })
  }

  setPageTo(page: string): void {
    this.resultsSubscribed = this.service.setPage(page)
    .subscribe(
      (res: ResultsFromApi) => {
        this.pokemonsCount$ = of(res.count)
        this.service.nextPage = res.next
        this.service.previousPage = res.previous
        this.pokemons$ = of(res.results)
      }
    )
  }
}
