import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { PokedexService } from '../../services/pokedex.service'
import { results } from 'src/app/interfaces/results'

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})

export class PokedexComponent implements OnInit  {
  resultsFromPage!: Subscription

  constructor(private service: PokedexService) { }

  ngOnInit(): void {
    this.getResultsByPage('init')
  }

  ngOnDestroy() {
    this.resultsFromPage.unsubscribe()
  }

  getResultsByPage(page: string) {
    this.resultsFromPage = this.service.setPage(page).subscribe(
      (res: results) => this.service.results = {
        count: res.count,
        next: res.next,
        previous: res.previous,
        pokemons: res.results?.map(({name}) => this.service.pokemons.push(name))
      }
    )
  }

  getError() {
    return this.service.error
  }
  
  getInputValue() {    
    return this.service.inputValue
  }

  getEvent($event: any) {
    return this.service.getByEvent($event)
  }

  getPokemonsFiltered() {
    return this.service.pokemonFiltered
  }

  getPokemonsName() {
    return this.service.filterPokemons()
  }

  getCountPage() {
    return this.service.results.count
  }

}
