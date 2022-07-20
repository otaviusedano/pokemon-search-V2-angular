import { Component, Input, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {
  defaultLimit: number = 24 
  current: number = 1
  pages!: number;

  constructor(private service: PokedexService) { }

  @Input() pokedexPage: any;
  @Input() countPage: any;

  ngOnInit(): void {
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

