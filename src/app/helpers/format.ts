import { PokemonStat, PokemonStats, StatsFormed } from "../interfaces/stats"
import { PokemonType, PokemonTypes } from "../interfaces/types"
import { EvolutionData, EvolutionsData } from "../interfaces/evolutions"

import typeColors, { iconsStatsColors } from "./pokemonTypes"
import { IconName } from "@fortawesome/fontawesome-svg-core"

class format {
  statsFormed!: StatsFormed

  icon(statName: string) {
    let fasIcon: IconName = 'i'
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
    return fasIcon
  }

  stats(stats: PokemonStats) {

    return stats?.stats?.map((stat: PokemonStat) => {

      const statName: string = stat.stat.name
      const statBase: number = stat.base_stat
      const statNameSplited: string[] = statName.split('-')

      let statNameFormated
        if (statNameSplited.length > 1) {
          const statNameRefact1 = statNameSplited[0].substring(0, 2)
          const statNameRefact2 = statNameSplited[1].substring(0, 3)

          statNameFormated = statNameRefact1 + '.' + statNameRefact2
        }

        this.statsFormed = {
          fasIcon: this.icon(statName),
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

  types(pokemon: PokemonTypes) {
    return pokemon?.types?.map((type: PokemonType) => {
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

  evolutions(evolution: EvolutionData): EvolutionsData {
    return {
      next: evolution?.evolves_to?.map((e: any) => this.evolutions(e)),
      pokemon: { name: evolution?.species.name }
    }
  }
}

export default new format()