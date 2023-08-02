import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtGoogleTimeLineComponent } from './ct-google-time-line.component';

describe('CtGoogleTimeLineComponent', () => {
  let component: CtGoogleTimeLineComponent;
  let fixture: ComponentFixture<CtGoogleTimeLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtGoogleTimeLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtGoogleTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
