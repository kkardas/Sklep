import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasekGornyComponent } from './pasek-gorny.component';

describe('PasekGornyComponent', () => {
  let component: PasekGornyComponent;
  let fixture: ComponentFixture<PasekGornyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasekGornyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasekGornyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
