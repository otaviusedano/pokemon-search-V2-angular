import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { PokedexService } from 'src/app/services/pokedex.service'
import { PokemonData } from 'src/app/interfaces/pokemon'

import format from 'src/app/helpers/format'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit, OnDestroy {
  format: any = format
  pokemon!: PokemonData
  subscribed!: Subscription

  constructor(private service: PokedexService) { }

  @Input() pokemonName!: string

  ngOnInit(): void {
    this.getPokemon()
  }

  ngOnDestroy(): void {
    this.subscribed.unsubscribe()
  }

  getPokemon(): void {
    this.subscribed = this.service.getPokemonByName(this.pokemonName)
    .subscribe({
      next: (pokemonData: PokemonData) => this.pokemon = pokemonData,
      error: (err: Error) => this.service.error = err
    })
  }
}
