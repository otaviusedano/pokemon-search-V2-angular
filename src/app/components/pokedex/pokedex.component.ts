import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs/internal/Subscription'
import { Observable } from 'rxjs'

import { PokedexService } from '../../services/pokedex.service'
import { results } from 'src/app/interfaces/results'
import format from 'src/app/helpers/format'

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})

export class PokedexComponent implements OnInit, OnDestroy  {
  format: any = format
  resultsSubscribed!: Subscription
  pokemonsFiltered: string[] = []
  inputValue!: string
  pokemons!: any[]
  count!: number
  results$!: Observable<any>
  pokemons$!: Observable<any>
  count$!: Observable<any>
  nextPage$!: Observable<any>
  prevPage$!: Observable<any>

  constructor(private service: PokedexService) { }

  ngOnInit(): void {
    this.setPageTo('init')
  }

  ngOnDestroy(): void {
    this.service.pokemonFiltered = []
  }

  getError(): Error | undefined {
    return this.service.error
  }

  getInputValue($event: any): void {
    this.inputValue = $event
  }

  filterPokemons(): string[] {
    if (this.service.pokemonFiltered?.length > 0 || this.service.pokemonFiltered?.length >= 1) {
      return this.service.pokemonFiltered
    }

    return this.service.results?.pokemons.filter((pokemon: string) => {

      if (this.inputValue) {
        return pokemon.includes(this.inputValue)
      } else {
        return true
      }
    })
  }

  setPageTo(page: string): void {
    this.resultsSubscribed = this.service.setPage(page).pipe(
    ).subscribe(
      (res: results) =>
      this.service.results = {
        count: res.count,
        next: res.next,
        previous: res.previous,
        pokemons: res.results.map(({name}) =>
          name
        )
      }
    )
  }

}
