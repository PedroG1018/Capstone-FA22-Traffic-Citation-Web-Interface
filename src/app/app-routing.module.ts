import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import different components (views)
import { AppComponent } from './app.component';
import { CreateCitationComponent } from './components/create-citation/create-citation.component';
import { EditCitationComponent } from './components/edit-citation/edit-citation.component';

// Define all routes in Routes array
const routes: Routes = [
  { path: 'app-component', component: AppComponent },
  { path: 'create-citation-component', component: CreateCitationComponent },
  { path: 'edit-citation-component', component: EditCitationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
