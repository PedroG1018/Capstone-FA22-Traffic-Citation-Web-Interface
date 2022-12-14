import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

// Import different components (views)
import { AppComponent } from './app.component';
import { CreateCitationComponent } from './components/citation/create-citation/create-citation.component';
import { EditCitationComponent } from './components/citation/edit-citation/edit-citation.component';
import { ViewCitationsComponent } from './components/citation/view-citations/view-citations.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DriverFormComponent } from './components/citation/forms/driver-form/driver-form.component';

// Define all routes in Routes array
const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'profile', component: ProfileComponent, title: 'Profile' },
  {
    path: 'create-citation',
    canActivate: [AuthGuard],
    component: CreateCitationComponent,
    title: 'Creating Citation',
  },
  {
    path: 'edit-citation',
    canActivate: [AuthGuard],
    component: EditCitationComponent,
    title: 'Editing Citations',
  },
  {
    path: 'view-citations',
    canActivate: [AuthGuard],
    component: ViewCitationsComponent,
    title: 'Viewing Citations',
  },
  {
    path: 'confirmation-dialog',
    canActivate: [AuthGuard],
    component: ConfirmationDialogComponent,
    title: 'Check for driver',
  },
  {
    path: 'driver-form',
    canActivate: [AuthGuard],
    component: DriverFormComponent,
    title: 'Driver Information',
  },
  {
    path: 'home',
    component: LandingPageComponent,
    title: 'Home',
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // TODO: Change to login page
  { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' }, // Wildcard route (404 page)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
