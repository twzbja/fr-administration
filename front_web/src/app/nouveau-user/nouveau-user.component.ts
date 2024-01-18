import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-nouveau-user',
  templateUrl: './nouveau-user.component.html',
  styleUrls: ['./nouveau-user.component.scss']
})
export class NouveauUserComponent {
  isLoggedIn: boolean = false;
  newUser: any = {};


  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private route: Router
  ){
    this.isLoggedIn = tokenStorageService.isLogged();
  }

  // Fonction pour créer un nouvel utilisateur
  createUser(): void {
    this.http.post('http://localhost:3000/users', this.newUser).subscribe(response => {
      console.log(response);
      this.route.navigate(['/users']);
    });
  }
}
