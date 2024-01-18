import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profil-utilisateur',
  templateUrl: './profil-utilisateur.component.html',
  styleUrls: ['./profil-utilisateur.component.scss']
})
export class ProfilUtilisateurComponent {

  isLoggedIn: boolean = false;
  user: any = [];
  roles: any = [];
  errorMessage: string= '';

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.isLoggedIn = tokenStorageService.isLogged();
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['userId'];
    console.log(userId);
    this.http.get(`http://localhost:3000/users/${userId}`).subscribe(user => this.user = user);
    this.http.get(`http://localhost:3000/users/${userId}/roles`).subscribe(roles => this.roles = roles);
  }

  // Supprimer un utilisateur
  deleteUser() {
    const userId = this.route.snapshot.params['userId'];
    console.log(userId);  
    this.http.delete(`http://localhost:3000/users/${userId}`).subscribe(response => {
      console.log(response);
    });
    this.router.navigateByUrl('/users')
    .catch((error: HttpErrorResponse) => {
      console.error(error);
      this.errorMessage = 'Une erreur s\'est produite lors de la connexion';
    });
    
  }
}
