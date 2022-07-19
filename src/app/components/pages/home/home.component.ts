import { Component, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit { 
  constructor(private service: PokedexService) {  }
  
  ngOnInit(): void {
    this.reset()
  }

  reset() {
    this.service.evolutions = []
    this.service.firstPokemonOfChain = []
  }
}
