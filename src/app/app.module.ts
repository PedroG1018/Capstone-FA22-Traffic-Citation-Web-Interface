import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
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
import { CitationDialogComponent } from './citation-dialog/citation-dialog.component';
import { CitationService } from './services/citation.service';


@NgModule({
  declarations: [
    AppComponent,
    EditCitationComponent,
    CreateCitationComponent,
    ViewCitationsComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    CitationDialogComponent,
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
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgbModule
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}}, CitationService, 
    {provide: MAT_DIALOG_DATA, useValue:{}},
    {provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: {color: 'primary'}}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
