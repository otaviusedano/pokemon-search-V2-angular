import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { PokedexService } from 'src/app/services/pokedex.service'
import { pokemonData } from 'src/app/interfaces/pokemon'

import format from 'src/app/helpers/format'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit, OnDestroy {
  format: any = format
  pokemon!: pokemonData
  pokemonData!: Subscription

  constructor(private service: PokedexService) { }

  @Input() pokemonName!: string

  ngOnInit(): void {
    this.getPokemon()
  }

  ngOnDestroy(): void {
    this.pokemonData.unsubscribe()
  }

  getPokemon(): void {
    this.pokemonData = this.service.getPokemonByName(this.pokemonName)
    .subscribe((data: pokemonData) => {
      this.pokemon = data
    }, error => this.service.error = error.status)
  }
}
