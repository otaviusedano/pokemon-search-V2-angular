import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokedexService } from 'src/app/services/pokedex.service'

import { HeaderComponent } from './header.component'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>
  let service: Partial<PokedexService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents()

    service = TestBed.inject(PokedexService)

    fixture = TestBed.createComponent(HeaderComponent)
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