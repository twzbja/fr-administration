import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, lastValueFrom  } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.scss']
})
export class AssociationsListComponent {
  isLoggedIn: boolean = false;
  associations: any= [];

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private route: Router
  ){
    this.isLoggedIn = tokenStorageService.isLogged();
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/associations').subscribe(associations => this.associations = associations);
  }

  // Fonction pour accéder à son profil et mettre à jour ses informations
  goToAssociationProfile(idAssociation: number) {
    console.log(idAssociation);
    this.route.navigateByUrl(`profilAssociation/${idAssociation}`);
  }
    
}

