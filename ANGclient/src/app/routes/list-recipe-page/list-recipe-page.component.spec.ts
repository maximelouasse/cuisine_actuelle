import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecipePageComponent } from './list-recipe-page.component';

describe('ListRecipePageComponent', () => {
  let component: ListRecipePageComponent;
  let fixture: ComponentFixture<ListRecipePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRecipePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRecipePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
