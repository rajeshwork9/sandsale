import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletedlistPage } from './completedlist.page';

describe('CompletedlistPage', () => {
  let component: CompletedlistPage;
  let fixture: ComponentFixture<CompletedlistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompletedlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
