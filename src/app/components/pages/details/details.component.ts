import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokedexService } from 'src/app/services/pokedex.service';

import format from '../../../helpers/format'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  pokemon: any
  format: any
  types: any
  stats: any
  firstPokemon: any
  evolutions: any[] = []
  pokemonName: any
  pokemonNameByParams!: Subscription
  paramentos: any;

  constructor(private route: ActivatedRoute, private service: PokedexService, private router: Router) { }
  
  ngOnInit(): void {
    this.getPokemonsDetails()
    this.firstPokemon = this.service.firstPokemonOfChain
    this.evolutions = this.service.evolutions
    this.format = format

    this.reset()
  }

  ngOnDestroy() {
    this.pokemonNameByParams.unsubscribe()
  }

  reset() {
    this.service.pokemons = []
    this.service.pokemonFiltered = []
    this.service.inputValue = ''
  }

  getPokemonsDetails() {
    this.pokemonNameByParams = this.route.params.subscribe((params: any) => {
      this.pokemonName = params['pokemon.name']

      this.service.getPokemonByName(this.pokemonName).subscribe((pokemonData: any) => {
        this.pokemon = pokemonData
        this.service.getEvolutionChain(pokemonData.id)
      }, (err) => err.status === 404
          ? this.router.navigate(['/']) 
          : this.pokemon
      )
    })
  }
}
