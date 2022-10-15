import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { auth0 as auth0} from '../environments/auth0.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditCitationComponent } from './components/edit-citation/edit-citation.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCitationComponent } from './components/create-citation/create-citation.component';
import { ViewCitationsComponent } from './components/view-citations/view-citations.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    EditCitationComponent,
    CreateCitationComponent,
    ViewCitationsComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    AuthModule.forRoot({
      domain: auth0.auth.domain,
      clientId: auth0.auth.clientId,
      redirectUri: window.location.origin,
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
