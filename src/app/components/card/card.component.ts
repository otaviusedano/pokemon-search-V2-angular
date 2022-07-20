import { Component, Input, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { PokedexService } from 'src/app/services/pokedex.service'
import { pokemonData } from 'src/app/interfaces/pokemon'

import format from 'src/app/helpers/format'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
  pokemon!: pokemonData
  format: any = format
  pokemonData!: Subscription

  constructor(private service: PokedexService) { }

  @Input() pokemonName!: string

  ngOnInit(): void {
    this.getPokemon() 
  }

  formatResults(): string[] | string | undefined  {
    if (this.service.pokemonFiltered.length > 0) {
      return this.service.pokemonFiltered
    }
    return this.pokemonName
  }

  getPokemon(): void {
    this.pokemonData = this.service.getPokemonByName(this.formatResults())
      .subscribe((data: pokemonData) => {
        this.pokemon = data
      }, error => this.service.error = error.status)
  }
}
