import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokedexService } from 'src/app/services/pokedex.service';
import format from '../../helpers/format'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
  format: any
  types: any
  typeColors: any;
  pokemon: any
  pokemonData!: Subscription;

  constructor(private service: PokedexService) { }

  @Input() pokemonName: any
  
  ngOnInit(): void {    
    this.format = format

    this.getPokemon()
  }

  ngOnDestroy() {
    this.pokemonData.unsubscribe()
  }

  formatResults() {
    if (this.service.pokemonFiltered.length > 0) {
      return this.service.pokemonFiltered
    }
    return this.pokemonName
  }

  getPokemon() {
    this.pokemonData = this.service.getPokemonByName(this.formatResults())
      .subscribe((data: any) => {
        this.pokemon = data
      }, error => this.service.error = error.status)
  }
}
