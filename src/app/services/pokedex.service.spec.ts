import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PokedexService } from './pokedex.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'

describe('PokedexService', () => {
  let service: PokedexService
  let http: HttpClient
  let fixture: ComponentFixture<PokedexService>
  let headerDe: any
  let headerEl: HTMLElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    })

    service = TestBed.inject(PokedexService)
    http = TestBed.inject(HttpClient)
  })

  it('should service be true', () => {
    expect(service).toBeTruthy()
  })

  it('should be called with correct initial endpoint', () => {
    const spy = spyOn(http, 'get').and.callThrough()
    service.setPage('init')
    expect(spy).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=24')
  })

  it('should be called with correct lastPage endpoint', () => {
    const spy = spyOn(http, 'get').and.callThrough()
    service.setPage('lastPage')
    expect(spy).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/?offset=1128&limit=24')
  })
})
