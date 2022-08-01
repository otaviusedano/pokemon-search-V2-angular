import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router  } from '@angular/router'
import { Subscription } from 'rxjs'

import { evolutionsData, evolutions } from '../../../interfaces/pokemon'
import { pokemonData } from 'src/app/interfaces/pokemon'
import { PokedexService } from 'src/app/services/pokedex.service'
import format from 'src/app/helpers/format'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit, OnDestroy {
  format: any = format
  pokemonName!: string
  stats: any
  evolutions: evolutions[] = []
  pokemonSubscribe!: Subscription
  pokemon: pokemonData = {
    id: 0,
    name: '',
    sprites: {
      front_default: '',
    },
    evolutions: [{
      next: undefined,
      pokemon: {
        name: ''
      }
    }],
    stats: [],
  }

  constructor(
    private route: ActivatedRoute,
    private service: PokedexService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPokemonsDetails()
  }

  ngOnDestroy(): void {
    this.pokemonSubscribe.unsubscribe()
  }

  getEvolutionChain(pokemonId: number): void  {
    const isExistEvolutions = this.evolutions.length > 0

    if (!isExistEvolutions) {
      this.service.getPokemonSpecies(pokemonId).subscribe((res: any) =>
        this.getEvolutionPokemons(res.evolution_chain.url))
    }
  }

  getEvolutionPokemons(evolutionChainUrl: string): void {
    this.service.getEvolutionChain(evolutionChainUrl).subscribe((evolution: any) => {

      const evolutionsFormated = format.evolutions(evolution.chain)
      this.evolutions.push(evolutionsFormated.pokemon)

      this.generatePokemonEvolutions(evolutionsFormated)
    })
  }

  generatePokemonEvolutions(evolutions: evolutionsData): void {
    evolutions?.next?.map((evolution: any) => {

      this.evolutions.push(evolution.pokemon)

      this.generatePokemonEvolutions(evolution)
    })
  }

  getPokemonsDetails(): void {
    this.route.params.subscribe((params) => {
      this.pokemonName = params['pokemon.name']

      this.pokemonSubscribe = this.service.getPokemonByName(this.pokemonName)
        .subscribe((pokemonData: pokemonData) => {
          this.pokemon = pokemonData
          this.getEvolutionChain(pokemonData.id)
          this.stats = this.format.stats(this.pokemon)
      }, (err) => err.status === 404
          ? this.router.navigate(['**']) 
          : this.pokemon
      )
    })
  }
}
