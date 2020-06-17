import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRecipePageComponent } from './detail-recipe-page.component';

describe('DetailRecipePageComponent', () => {
  let component: DetailRecipePageComponent;
  let fixture: ComponentFixture<DetailRecipePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRecipePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRecipePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
