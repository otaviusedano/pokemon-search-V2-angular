import { Component, Input, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {
  offset: any
  defaultLimit!: number
  current!: number
  pages: any;

  constructor(private service: PokedexService) {  }

  @Input() pokedexPage: any;
  @Input() countPage: any;

  ngOnInit(): void {
    this.current = 1
    this.defaultLimit = 24 
    this.pages = Math.ceil(this.countPage / this.defaultLimit) 
  }

  nextPage() {
    this.service.pokemons = []
    this.current++
    this.pokedexPage('next')
  }
  
  prevPage() {
    this.service.pokemons = []

    if (this.current === this.pages) {
      this.current--
      this.pokedexPage('lastPage')
    } else {
      this.current--
      this.pokedexPage('prev')
    }
  }

}

