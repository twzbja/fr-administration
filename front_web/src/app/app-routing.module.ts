import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NouveauUserComponent } from './nouveau-user/nouveau-user.component';
import { NouvellAssociationComponent } from './nouvell-association/nouvell-association.component';
import { ProfiAssociationComponent } from './profi-association/profi-association.component';
import { ProfilUtilisateurComponent } from './profil-utilisateur/profil-utilisateur.component';
import { ProfilComponent } from './profil/profil.component';
import { RechercherComponent } from './rechercher/rechercher.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersListComponent, canActivate: [AuthGuard]},
  {path: 'associations', component: AssociationsListComponent, canActivate: [AuthGuard]},
  {path: 'profil', component: ProfilComponent, canActivate: [AuthGuard]},
  {path: 'nouveauUser', component: NouveauUserComponent, canActivate: [AuthGuard]},
  {path: 'nouvellAssociation', component: NouvellAssociationComponent, canActivate: [AuthGuard]},
  {path: 'rechercher', component: RechercherComponent, canActivate: [AuthGuard]},
  {path: 'profilUtilisateur/:userId', component: ProfilUtilisateurComponent, canActivate: [AuthGuard]},
  {path: 'profilAssociation/:associationId', component: ProfiAssociationComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
