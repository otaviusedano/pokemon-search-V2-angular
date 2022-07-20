import { Component, EventEmitter, Output } from '@angular/core'
import { PokedexService } from 'src/app/services/pokedex.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  constructor(private service: PokedexService) { }

  @Output() inputValue = new EventEmitter<any>()

  handlerChange(value: string) {
    this.inputValue.emit(value.toLowerCase())
    console.log(this.service.pokemonFiltered);
    this.service.pokemonFiltered = []
    this.service.error = undefined
  }

  handlerSearch(value: string) {
    if (!this.service.pokemonFiltered.length) {
      this.service.pokemonFiltered.push(value.toLowerCase())
    }
  }

}
