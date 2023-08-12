import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CatListingComponent } from './components/cat-listing/cat-listing.component';
import { IncidentListingComponent } from './components/incident-listing/incident-listing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CatDetailComponent } from './components/cat-detail/cat-detail.component';
import { IncidentDetailComponent } from './components/incident-detail/incident-detail.component';
import { HomeComponent } from './components/home/home.component';
import { CatCreateComponent } from './components/cat-create/cat-create.component';
import { IncidentCreateComponent } from './components/incident-create/incident-create.component'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CatListingComponent,
    IncidentListingComponent,
    ProfileComponent,
    CatDetailComponent,
    IncidentDetailComponent,
    HomeComponent,
    CatCreateComponent,
    IncidentCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
