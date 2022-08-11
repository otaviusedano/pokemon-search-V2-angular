import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {
  pokemonsPerPage: number = 20
  current: number = 1
  pages!: number

  constructor() { }

  @Output() emitPage = new EventEmitter<any>()
  @Input() pokemonsCount!: number

  ngOnInit(): void {
    this.pages = Math.ceil(this.pokemonsCount / this.pokemonsPerPage)
  }

  nextPage() {
    console.log();
    this.current++
    this.emitPage.emit('next');
  }

  prevPage() {
    if (this.current === this.pages) {
      this.current--
      this.emitPage.emit('lastPage');
    } else {
      this.current--
      this.emitPage.emit('prev');
    }
  }

}

