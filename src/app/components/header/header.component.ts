import { Component, EventEmitter, Output } from '@angular/core'
import { PokedexService } from 'src/app/services/pokedex.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  constructor(private service: PokedexService) { }
  pokemonName!: string

  @Output() inputValue = new EventEmitter<any>()

  handlerChange(value: string) {
    this.pokemonName = value.toLowerCase().trim()
    this.inputValue.emit(this.pokemonName)
    this.service.error = undefined
    this.service.pokemonFiltered = []
  }

  handlerSearch() {
    this.service.pokemonFiltered.push(this.pokemonName)
  }

}
