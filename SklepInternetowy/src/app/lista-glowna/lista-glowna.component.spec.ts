import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGlownaComponent } from './lista-glowna.component';

describe('ListaGlownaComponent', () => {
  let component: ListaGlownaComponent;
  let fixture: ComponentFixture<ListaGlownaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaGlownaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGlownaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
