import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { PokedexComponent } from './pokedex.component'
import { PokedexService } from '../../services/pokedex.service'

describe('PokedexComponent', () => {
  let component: PokedexComponent
  let fixture: ComponentFixture<PokedexComponent>
  let service: Partial<PokedexService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents()

    service = TestBed.inject(PokedexService)

    fixture = TestBed.createComponent(PokedexComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should component be true', () => {
    expect(component).toBeTruthy()
  })

  it('should service be true', () => {
    expect(service).toBeTruthy()
  })

  it('should have app-header', () => {
    fixture = fixture.nativeElement.querySelector('app-header')
    expect(fixture).toBeTruthy()
  })
})
