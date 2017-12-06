import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktWkoszykuComponent } from './produkt-wkoszyku.component';

describe('ProduktWkoszykuComponent', () => {
  let component: ProduktWkoszykuComponent;
  let fixture: ComponentFixture<ProduktWkoszykuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduktWkoszykuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduktWkoszykuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
