import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-nouvell-association',
  templateUrl: './nouvell-association.component.html',
  styleUrls: ['./nouvell-association.component.scss']
})
export class NouvellAssociationComponent {
  isLoggedIn: boolean = false;
  newAssociation: any = {};

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private route: Router
  ){
    this.isLoggedIn = tokenStorageService.isLogged();
  }

  // Fonction pour créer une nouvelle association
  async createAssociation(): Promise<void> {
    let membersIds = [];
    if (this.newAssociation.idUsers) {
      membersIds = this.newAssociation.idUsers.split(',').map((id: string | number) => +id);
    }
    const existingMembers = [];
    for (let i = 0; i < membersIds.length; i++) {
      try {
        const response = await this.http.get(`http://localhost:3000/users/${membersIds[i]}`).toPromise();
        if (response) {
          existingMembers.push(response);
        }
      } catch (error) {
        console.error(error);
        alert('Les id ne correspondent pas a des users');
        return;
      }
    }
      // Tous les IDs d'utilisateurs sont valides, on peut créer l'association
      console.log(membersIds);

      let data = { name: this.newAssociation.name, idUsers: membersIds };


      this.http.post('http://localhost:3000/associations', data).subscribe(response => {
        {this.route.navigate(['/associations'])}
      });
  }
}
