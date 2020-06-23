import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilSettingsComponent } from './profil-settings.component';

describe('ProfilSettingsComponent', () => {
  let component: ProfilSettingsComponent;
  let fixture: ComponentFixture<ProfilSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
