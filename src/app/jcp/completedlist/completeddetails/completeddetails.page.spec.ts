import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompleteddetailsPage } from './completeddetails.page';

describe('CompleteddetailsPage', () => {
  let component: CompleteddetailsPage;
  let fixture: ComponentFixture<CompleteddetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompleteddetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
