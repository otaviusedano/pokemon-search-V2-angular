import { IconName } from "@fortawesome/fontawesome-svg-core"

export interface PokemonStat {
  stat: {
    name: string
  }
  base_stat: number
}

export interface PokemonStats {
  stats: PokemonStat[]
}

export interface StatsFormed {
  fasIcon: IconName,
  statName: string | undefined,
  statBase: number
}