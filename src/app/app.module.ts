// Modules
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorStateMatcher, MatNativeDateModule, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { CreateDriverComponent } from './components/driver/create-driver/create-driver.component';
import { EditDriverComponent } from './components/driver/edit-driver/edit-driver.component';
import { CreateCitationComponent } from './components/citations/create-citation/create-citation.component';
import { EditCitationComponent } from './components/citations/edit-citation/edit-citation.component';
import { ViewCitationsComponent } from './components/citations/view-citations/view-citations.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

// Misc
import { CitationService } from './services/citation.service';
import { FormatTimeSpan } from './components/citations/view-citations/formatTimespan';
import { DriverLicenseDialogComponent } from './components/driver/driver-license-dialog/driver-license-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EditCitationComponent,
    CreateCitationComponent,
    ViewCitationsComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    CreateDriverComponent,
    EditDriverComponent,
    FormatTimeSpan,
    DriverLicenseDialogComponent,
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
    NgbModule,
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}}, CitationService, 
    {provide: MAT_DIALOG_DATA, useValue:{}}, // Pass data between dialogs
    {provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: {color: 'primary'}}, // Change default radio btn color
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}, // Used to check for valid input
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
