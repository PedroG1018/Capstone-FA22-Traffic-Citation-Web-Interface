// Modules
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';




//Auth0
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

//Components
import { AppComponent } from './app.component';
import { DriverFormComponent } from './components/driver/driver-form/driver-form.component';
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
import { InputErrorStateMatcher } from './error-state-matching';
import { ProfileComponent } from './components/profile/profile.component';
import { CitationFormComponent } from './components/citations/citation-form/citation-form.component';
import { OfficerFormComponent } from './components/citations/officer-form/officer-form.component';
import { CitationReviewComponent } from './components/citations/citation-review/citation-review.component';

@NgModule({
  declarations: [
    AppComponent,
    EditCitationComponent,
    CreateCitationComponent,
    ViewCitationsComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    DriverFormComponent,
    EditDriverComponent,
    FormatTimeSpan,
    DriverLicenseDialogComponent,
    ProfileComponent,
    CitationFormComponent,
    OfficerFormComponent,
    CitationReviewComponent,
  ],
  imports: [
    AuthModule.forRoot({
      ...env.auth,
      // Whenever making http call with apiUrl, insert jwt token
      httpInterceptor: {
        allowedList: [
          `${env.auth.apiUri}/*`,
        ],
      },
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
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatTreeModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSidenavModule,
    MatGridListModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} }, CitationService,
    { provide: MAT_DIALOG_DATA, useValue: {} }, // Pass data between dialogs
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'primary' } }, // Change default radio btn color
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
        panelClass: 'mat-dialog-override',
        hasBackdrop: true,
        disableClose: true
      }
    },
    { provide: ErrorStateMatcher, useClass: InputErrorStateMatcher },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
