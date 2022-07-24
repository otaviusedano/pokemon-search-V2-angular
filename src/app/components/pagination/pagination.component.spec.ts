import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { PokedexService } from '../../services/pokedex.service'

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let service: Partial<PokedexService>
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    service = TestBed.inject(PokedexService)
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should component be true', () => {
    expect(component).toBeTruthy();
  });

  it('should service be true ', () => {
    expect(service).toBeTruthy();
  });
});
