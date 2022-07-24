import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokedexService } from 'src/app/services/pokedex.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: Partial<PokedexService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    service = TestBed.inject(PokedexService)

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should component be true', () => {
    expect(component).toBeTruthy();
  });

  it('should service be true', () => {
    expect(service).toBeTruthy();
  });
});
