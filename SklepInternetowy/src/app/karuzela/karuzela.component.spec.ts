import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KaruzelaComponent } from './karuzela.component';

describe('KaruzelaComponent', () => {
  let component: KaruzelaComponent;
  let fixture: ComponentFixture<KaruzelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaruzelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaruzelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
