import { Component, EventEmitter, Output } from '@angular/core'
import { PokedexService } from 'src/app/services/pokedex.service'
import { PokemonToSearch } from 'src/app/interfaces/pokemon'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  pokemonName!: string
  pokemonToSearch!: PokemonToSearch

  constructor(private service: PokedexService) { }

  @Output() inputValue = new EventEmitter<string>()

  handlerChange(value: string) {
    this.pokemonName = value.toLowerCase().trim()
    this.pokemonToSearch = {
      name: this.pokemonName
    }
    this.inputValue.emit(this.pokemonName)
    this.reset()
  }

  reset() {
    this.service.error = undefined
    this.service.pokemonFiltered = []
  }

  handlerSearch() {
    if (this.service.pokemonFiltered.length <= 0) {
      this.service.pokemonFiltered.push(this.pokemonToSearch)
    }
  }
}
