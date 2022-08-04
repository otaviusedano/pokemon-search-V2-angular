import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs/internal/Subscription'
import { Observable } from 'rxjs'

import { PokedexService } from '../../services/pokedex.service'
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

  filterPokemons(): any {
    if (this.service.pokemonFiltered?.length > 0 || this.service.pokemonFiltered?.length >= 1) {
      return this.service.pokemonFiltered
    }

    return this.service.results?.results.filter(({name}) => {
      if (this.inputValue) {
        return name.includes(this.inputValue)
      } else {
        return name
      }
    })
  }

  setPageTo(page: string): void {
    this.resultsSubscribed = this.service.setPage(page)
      .subscribe(
        (res: any) =>
        this.service.results = {
          count: res.count,
          next: res.next,
          previous: res.previous,
          results: res.results
        }
      )
  }
}
