import { Component, OnInit, Input } from '@angular/core'
import { PokedexService } from 'src/app/services/pokedex.service'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {
  pokemonsPerPage: number = 20
  current: number = 1
  pages!: number

  constructor(private service: PokedexService) { }

  @Input() setPageTo: any

  ngOnInit(): void {
    this.pages = Math.ceil(this.service.results?.count / this.pokemonsPerPage)
  }

  nextPage() {
    this.current++
    this.setPageTo('next')
  }

  prevPage() {
    if (this.current === this.pages) {
      this.current--
      this.setPageTo('lastPage')
    } else {
      this.current--
      this.setPageTo('prev')
    }
  }

}

