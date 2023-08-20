import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatDetailComponent } from './components/cat-detail/cat-detail.component';
import { CatListingComponent } from './components/cat-listing/cat-listing.component';
import { IncidentDetailComponent } from './components/incident-detail/incident-detail.component';
import { IncidentListingComponent } from './components/incident-listing/incident-listing.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CatCreateComponent } from './components/cat-create/cat-create.component';
import { IncidentCreateComponent } from './components/incident-create/incident-create.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: "cat/:id", component: CatDetailComponent },
  { path: "incident/:id", component: IncidentDetailComponent },
  { path: "create/cat", component: CatCreateComponent },
  { path: "create/incident", component: IncidentCreateComponent },
  { path: "incident", component: IncidentListingComponent },
  { path: "cat", component: CatListingComponent },
  { path: "profile", component: ProfileComponent },
  { path: "home", component: HomeComponent },
  { path: "error/:id", component: ErrorComponent},
  { path: "login", component: LoginComponent},
  { path: "", pathMatch: 'full', redirectTo: "/home"},
  { path: "**", redirectTo: "/error/404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
