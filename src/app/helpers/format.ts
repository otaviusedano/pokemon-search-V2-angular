import { 
  evolutionData, 
  evolutionsData, 
  pokemonTypes, 
  pokemonType, 
  pokemonStats, 
  pokemonStat 
} from "../interfaces/pokemon"

import typeColors, { iconsStatsColors } from "./pokemonTypes"

class format {
  statsFormed!: any
  statsFromPokemon!: any

  stats(stats: pokemonStats) {

    return stats?.stats?.map((stat: pokemonStat) => {

      const statName = stat.stat.name
      const statBase = stat.base_stat
      const statNameSplited = statName.split('-')

      let fasIcon = ''

      switch (statName) {
        case 'hp':
          fasIcon = 'heart'
        break

        case 'attack':
          fasIcon = 'gun'
        break

        case 'defense':
          fasIcon = 'shield-halved'
        break

        case 'special-attack':
          fasIcon = 'magic-wand-sparkles'
        break

        case 'special-defense':
          fasIcon = 'virus'
        break

        case 'speed':
          fasIcon = 'bolt'
        break
      }

      let statNameFormated
        if (statNameSplited.length > 1) {
          const statNameRefact1 = statNameSplited[0].substring(0, 2)
          const statNameRefact2 = statNameSplited[1].substring(0, 3)

          statNameFormated = statNameRefact1 + '.' + statNameRefact2
        }

        this.statsFormed = {
          fasIcon: fasIcon,
          statName: statNameFormated,
          statBase: statBase
        }

        if (!statNameFormated) {
          this.statsFormed = {
            ...this.statsFormed,
            statName: statName
          }
        }

      return this.statsFormed
    })
  }

  types(pokemon: pokemonTypes) {
    return pokemon?.types?.map((type: pokemonType) => {
      return type.type.name
    })
  }

  iconColors(iconName: string) {    
    const iconNameFormated = iconName.split('-').join('_')
    return iconsStatsColors[iconNameFormated]
  }

  colors(type: string) {
    return typeColors[type]
  }

  evolutions(evolution: evolutionData): evolutionsData {
    return {
      next: evolution?.evolves_to?.map((e: any) => this.evolutions(e)),
      pokemon: { name: evolution?.species.name }
    }
  }
}

export default new format()