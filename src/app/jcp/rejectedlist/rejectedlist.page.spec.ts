import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RejectedlistPage } from './rejectedlist.page';

describe('RejectedlistPage', () => {
  let component: RejectedlistPage;
  let fixture: ComponentFixture<RejectedlistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RejectedlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
