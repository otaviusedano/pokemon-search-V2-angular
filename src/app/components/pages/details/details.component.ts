import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router  } from '@angular/router'
import { Subscription } from 'rxjs'

import { pokemonData } from 'src/app/interfaces/pokemon'
import { PokedexService } from 'src/app/services/pokedex.service'
import format from 'src/app/helpers/format'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  format: any = format
  pokemonName!: string
  pokemon!: any
  types: any
  stats: any
  evolutions: any = this.service.evolutions
  firstPokemon: any = this.service.firstPokemonOfChain
  pokemonSubscribe!: Subscription

  constructor(
    private route: ActivatedRoute,
    private service: PokedexService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPokemonsDetails()
    this.reset()
  }

  ngOnDestroy(): void {
    this.pokemonSubscribe.unsubscribe()
  }

  reset(): void {
    this.service.pokemons = []
    this.service.pokemonFiltered = []
    this.service.inputValue = ''
  }

  getPokemonsDetails(): void {
    this.route.params.subscribe((params) => {
      this.pokemonName = params['pokemon.name']

      this.pokemonSubscribe = this.service.getPokemonByName(this.pokemonName)
        .subscribe((pokemonData: pokemonData) => {
          this.pokemon = pokemonData
          this.service.getEvolutionChain(pokemonData.id)
      }, (err) => err.status === 404
          ? this.router.navigate(['**']) 
          : this.pokemon
      )
    })
  }
}
