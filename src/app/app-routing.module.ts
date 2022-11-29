import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import different components (views)
import { AppComponent } from './app.component';
import { CreateCitationComponent } from './components/citations/create-citation/create-citation.component';
import { EditCitationComponent } from './components/citations/edit-citation/edit-citation.component';
import { ViewCitationsComponent } from './components/citations/view-citations/view-citations.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DriverFormComponent } from './components/driver/driver-form/driver-form.component';
import { EditDriverComponent } from './components/driver/edit-driver/edit-driver.component';
import { DriverLicenseDialogComponent } from './components/driver/driver-license-dialog/driver-license-dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewCitationSummaryComponent } from './components/citations/view-citation-summary/view-citation-summary.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

// Define all routes in Routes array
const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'home', component: HomeComponent, title: 'Traffic Citation Interface' },
  { path: 'profile', component: ProfileComponent, title: 'Profile'},
  { path: 'create-citation', component: CreateCitationComponent, title: 'Creating Citation' },
  { path: 'view-citation-summary', component: ViewCitationSummaryComponent, title: 'Viewing Citation Summary' },
  { path: 'edit-citation', component: EditCitationComponent, title: 'Editing Citations' },
  { path: 'view-citations', component: ViewCitationsComponent, title: 'Viewing Citations' },
  { path: 'driver-dialog', component: DriverLicenseDialogComponent, title: 'Check for driver' },
  { path: 'driver-form', component: DriverFormComponent, title: 'Driver Information' },
  { path: 'edit-driver', component: EditDriverComponent, title: 'Editing Driver'},
  { path: 'welcome-page', component: LandingPageComponent, title: 'Welcome Page' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: '', redirectTo: 'welcome-page', pathMatch: 'full' }, // TODO: Change to login page
  { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' } // Wildcard route (404 page)

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
