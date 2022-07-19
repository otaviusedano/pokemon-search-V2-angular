import typeColors from "./pokemonTypes"

class format {
  typeColors: any

  stats(stats: any) {
    return stats?.map((stat: any) => {
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
  
  types(pokemon: any) {    
    return pokemon?.types.map((type: any) => {
      return type.type.name
    })
  }

  colors(type: any) {    
    return this.typeColors = typeColors[type]
  }

  evolutions(evolution: any) {
    return {
      next: evolution?.evolves_to?.map((e: null) => this.evolutions(e)),
      pokemon: { name: evolution?.species.name }
    }
  }
}

export default new format()