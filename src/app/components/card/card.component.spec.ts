import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { PokedexService } from 'src/app/services/pokedex.service'

import { CardComponent } from './card.component'

describe('CardComponent', () => {
  let component: CardComponent
  let fixture: ComponentFixture<CardComponent>
  let service: Partial<PokedexService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents()

    service = TestBed.inject(PokedexService)

    fixture = TestBed.createComponent(CardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should component be true', () => {
    expect(component).toBeTruthy()
  })

  it('should service be true', () => {
    expect(service).toBeTruthy()
  })
})
