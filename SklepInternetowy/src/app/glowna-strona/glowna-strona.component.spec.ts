import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlownaStronaComponent } from './glowna-strona.component';

describe('GlownaStronaComponent', () => {
  let component: GlownaStronaComponent;
  let fixture: ComponentFixture<GlownaStronaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlownaStronaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlownaStronaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
