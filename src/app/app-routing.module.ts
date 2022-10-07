import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import different components (views)
import { AppComponent } from './app.component';
import { CreateCitationComponent } from './components/create-citation/create-citation.component';
import { EditCitationComponent } from './components/edit-citation/edit-citation.component';
import { ViewCitationsComponent } from './components/view-citations/view-citations.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/login.component';

// Define all routes in Routes array
const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'home', component: HomeComponent, title: 'Traffic Citation Interface' },
  { path: 'create-citation', component: CreateCitationComponent, title: 'New Citation' },
  { path: 'edit-citation', component: EditCitationComponent, title: 'Editing Citations' },
  { path: 'view-citations', component: ViewCitationsComponent, title: 'Viewing Citations' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // TODO: Change to login page
  { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' } // Wildcard route (404 page)

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
