import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, lastValueFrom  } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  isLoggedIn: boolean = false;
  users: any= [];

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private route: Router
  ){
    this.isLoggedIn = tokenStorageService.isLogged();
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/users').subscribe(users => this.users = users);
  }

  // Fonction pour accéder à son profil et mettre à jour ses informations
  goToUserProfile(userId: string) {
    this.route.navigate(['/profilUtilisateur', userId]);
  }
}
