import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})

export class ProfilComponent {
  isLoggedIn: boolean = false;
  dataSource: any = {};

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private route: Router
  ){
    this.isLoggedIn = tokenStorageService.isLogged();
  }

  ngOnInit(): void {
    const userId = this.tokenStorageService.getIdUser();
    console.log(userId);
    this.http.get(`http://localhost:3000/users/${userId}`).subscribe(response => {
      this.dataSource = response;
    });
  }

  // Fonction pour accéder à son profil et mettre à jour ses informations
  updateUser() {
    const userId = this.tokenStorageService.getIdUser();
    const userData = this.dataSource;
    this.http.put(`http://localhost:3000/users/${userId}`, userData).subscribe(response => {this.route.navigate(['/home'])});
    alert('Vos informations ont bien été mises à jour');
  }
}
