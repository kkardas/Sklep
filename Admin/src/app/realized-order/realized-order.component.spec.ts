import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizedOrderComponent } from './realized-order.component';

describe('RealizedOrderComponent', () => {
  let component: RealizedOrderComponent;
  let fixture: ComponentFixture<RealizedOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizedOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
