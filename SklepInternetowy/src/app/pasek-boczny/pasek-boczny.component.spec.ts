import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasekBocznyComponent } from './pasek-boczny.component';

describe('PasekBocznyComponent', () => {
  let component: PasekBocznyComponent;
  let fixture: ComponentFixture<PasekBocznyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasekBocznyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasekBocznyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
