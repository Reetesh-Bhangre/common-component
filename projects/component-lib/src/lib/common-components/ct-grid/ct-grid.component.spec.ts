import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtGridComponent } from './ct-grid.component';

describe('CtGridComponent', () => {
  let component: CtGridComponent;
  let fixture: ComponentFixture<CtGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
