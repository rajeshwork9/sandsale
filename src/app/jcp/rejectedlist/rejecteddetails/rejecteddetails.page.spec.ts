import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RejecteddetailsPage } from './rejecteddetails.page';

describe('RejecteddetailsPage', () => {
  let component: RejecteddetailsPage;
  let fixture: ComponentFixture<RejecteddetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RejecteddetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
