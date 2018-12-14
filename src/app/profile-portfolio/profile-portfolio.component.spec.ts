import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePortfolioComponent } from './profile-portfolio.component';

describe('ProfileWebPortfolioComponent', () => {
  let component: ProfilePortfolioComponent;
  let fixture: ComponentFixture<ProfilePortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePortfolioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
