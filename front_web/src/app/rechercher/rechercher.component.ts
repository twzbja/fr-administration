import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.component.html',
  styleUrls: ['./rechercher.component.scss']
})
export class RechercherComponent {
  isLoggedIn: boolean = false;
  userId: string = '';
  associationId: string = '';
  errorMessage: string= '';
  user: any = {};
  association: any = {};

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private route: Router
  ){
    this.isLoggedIn = tokenStorageService.isLogged();
  }

  onSubmit() {
    this.http.get(`http://localhost:3000/users/${this.userId}`)
      .toPromise()
      .then(user => {
        this.user = user;
        this.route.navigate(['/profilUtilisateur', this.userId]);
      })
      .catch(error => {
        // Si une erreur est retournée, affichez un message d'erreur
        this.errorMessage = 'Aucun utilisateur trouvé';
        return;
      });
  }

  onSubmitAssociation() {
    // Récupérer les informations de l'association en fonction de son identifiant
    this.http.get(`http://localhost:3000/associations/${this.associationId}`)
      .toPromise()
      .then(association => {
        this.association = association;
        this.route.navigate(['/profilAssociation', this.associationId]);
      })
      .catch(error => {
        // Si une erreur est retournée, affichez un message d'erreur
        this.errorMessage = 'Aucune association trouvée';
        return;
      });
  }
}
