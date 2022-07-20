import { 
  evolutionData, 
  evolutionsData, 
  pokemonTypes, 
  pokemonType, 
  pokemonStats, 
  pokemonStat 
} from "../interfaces/pokemon"

import typeColors from "./pokemonTypes"

class format {
  typeColors: any

  stats(stats: pokemonStats) {
    return stats?.stats?.map((stat: pokemonStat) => {
      const statName = stat.stat.name
      const statBase = stat.base_stat
      const statNameSplited = statName.split('-')
      const statNameRefact = statNameSplited.map((name: string) => {
        const statNameSubStr = name.substring(0, 3)
        return statNameSubStr
      })
      const statNameFormated = statNameRefact.join('-')

      return statNameFormated + ": " + statBase
    })
  }

  types(pokemon: pokemonTypes) {
    return pokemon?.types.map((type: pokemonType) => {
      return type.type.name
    })
  }

  colors(type: string) {
    return this.typeColors = typeColors[type]
  }

  evolutions(evolution: evolutionData): evolutionsData {
    return {
      next: evolution?.evolves_to?.map((e: any) => this.evolutions(e)),
      pokemon: { name: evolution?.species.name }
    }
  }
}

export default new format()