import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIconBtnComponent } from './delete-icon-btn.component';

describe('DeleteIconBtnComponent', () => {
  let component: DeleteIconBtnComponent;
  let fixture: ComponentFixture<DeleteIconBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteIconBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteIconBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
