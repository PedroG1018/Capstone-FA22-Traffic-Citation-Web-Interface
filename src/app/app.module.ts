import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditCitationComponent } from './components/edit-citation/edit-citation.component';
import { FormsModule } from '@angular/forms';
import { CreateCitationComponent } from './components/create-citation/create-citation.component';

@NgModule({
  declarations: [
    AppComponent,
    EditCitationComponent,
    CreateCitationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
