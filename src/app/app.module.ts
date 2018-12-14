import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuzzComponent } from './buzz/buzz.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';
import { ProfileExperienceComponent } from './profile-experience/profile-experience.component';
import { ProfileEducationComponent } from './profile-education/profile-education.component';
import { ProfileSkillComponent } from './profile-skill/profile-skill.component';
import { ProfileCertificationComponent } from './profile-certification/profile-certification.component';
import { ProfileProjectComponent } from './profile-project/profile-project.component';
import { ProfileAwardComponent } from './profile-award/profile-award.component';
import { ProfilePublicationComponent } from './profile-publication/profile-publication.component';
import { ProfileWebProfileComponent } from './profile-web-profile/profile-web-profile.component';
import { ProfileWebLanguageComponent } from './profile-web-language/profile-web-language.component';
import { ProfilePortfolioComponent } from './profile-portfolio/profile-portfolio.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BuzzComponent,
    ProfileComponent,
    ProfileExperienceComponent,
    ProfileEducationComponent,
    ProfileSkillComponent,
    ProfileCertificationComponent,
    ProfileProjectComponent,
    ProfileAwardComponent,
    ProfilePublicationComponent,
    ProfileWebProfileComponent,
    ProfileWebLanguageComponent,
    ProfilePortfolioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: BuzzComponent },
      { path: 'buzz', component: BuzzComponent },
      {
        path: 'profile', component: ProfileComponent,
        children: [
          { path: 'experience', component: ProfileExperienceComponent },
          { path: 'education', component: ProfileEducationComponent },
          { path: 'skills', component: ProfileSkillComponent },
          { path: 'portfolio', component: ProfilePortfolioComponent },
          { path: 'certification', component: ProfileCertificationComponent },
          { path: 'project', component: ProfileProjectComponent },
          { path: 'award', component: ProfileAwardComponent },
          { path: 'publication', component: ProfilePublicationComponent },
          { path: 'web-profile', component: ProfileWebProfileComponent },
          { path: 'language', component: ProfileWebLanguageComponent }
        ]
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
