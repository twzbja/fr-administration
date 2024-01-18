import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, InMemoryScrollingFeature, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-profi-association',
  templateUrl: './profi-association.component.html',
  styleUrls: ['./profi-association.component.scss']
})
export class ProfiAssociationComponent {

  isLoggedIn: boolean = false;
  assoc: any = [];
  members: any = [];
  minutes: any = [];
  roles: any = [];
  errorMessage: string= '';
  updateFormVisible: boolean = false;
  createFormVisible: boolean = false;
  createMinuteVisible: boolean = false;
  createMemberVisible: boolean = false;
  userToUpdate: any;
  minuteToCreate: any;
  newRole: string = '';
  newMinute: any = {};
  newMember: any = {};
  test: boolean = false;



  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.isLoggedIn = tokenStorageService.isLogged();
  }

  ngOnInit(): void {
    const associationId = this.route.snapshot.params['associationId'];
    console.log(associationId);
    this.http.get(`http://localhost:3000/associations/${associationId}`).subscribe(assoc => this.assoc = assoc);
    this.http.get(`http://localhost:3000/associations/${associationId}/members`).subscribe(members => this.members = members);
    this.http.get(`http://localhost:3000/associations/${associationId}/minutes`).subscribe(minutes => this.minutes = minutes);
  }

  // Supprimer une association
  deleteAssoc() {
    const associationId = this.route.snapshot.params['associationId'];
    console.log(associationId);  
    this.http.delete(`http://localhost:3000/associations/${associationId}`).subscribe(response => {
      console.log(response);
    });
    this.router.navigateByUrl('/associations')
    .catch((error: HttpErrorResponse) => {
      console.error(error);
      this.errorMessage = 'Une erreur s\'est produite lors de la connexion';
    });
  }

  // Ouvre le formulaire de mise à jour de rôle
  openUpdateForm(user: any) {
    if (user.role) {
      this.updateFormVisible = true;
      this.createFormVisible = false;
    }else {
      this.createFormVisible = true;
      this.updateFormVisible = false;
    }
    this.userToUpdate = user;
  }

  // Ouvre le formulaire de création d'un membre
  AjouterMembre() {
    this.createMemberVisible = !this.createMemberVisible;
  }

  // Mise à jour du rôle d'un membre
  updateUserRole(user: any) {
    const associationId = this.route.snapshot.params['associationId'];
    this.http.put(`http://localhost:3000/roles/${user.id}/${associationId}`, { name: this.newRole }).subscribe(response => {
      this.ngOnInit();
      this.updateFormVisible = false;
      this.newRole = '';
    });
  }

  // Création d'un rôle pour un membre
  createUserRole(user: any) {
    const associationId = this.route.snapshot.params['associationId'];
    console.log(this.http.post('http://localhost:3000/roles/', { idUser: user.id, idAssociation: associationId, name: this.newRole }));
    this.http.post('http://localhost:3000/roles/', { idUser: user.id, idAssociation: associationId, name: this.newRole }).subscribe(response => {
      this.ngOnInit();
      this.createFormVisible = false;
      this.newRole = '';
    });
  }

  // Ajouter une minute
  AjouterMinute() {
    this.createMinuteVisible = !this.createMinuteVisible;
  }

  // Cree un membre
  createMember() {
    const associationId = this.route.snapshot.params['associationId'];
    console.log(this.newMember.idUser)
    console.log(this.members)
    this.http.post('http://localhost:3000/associations/:id/members', associationId, this.newMember.idUser).subscribe(response => {
      this.ngOnInit();
      this.createMemberVisible = false;
      this.newMember = {};
    } );
  }



  // Créer une minute
  createMinute() {
  // Récupérez l'identifiant de l'association à partir de l'URL
  const associationId = this.route.snapshot.params['associationId'];
  
  // Vérifiez si les IDs des membres de la minute sont valides
  let membersIds = [];
    membersIds = this.newMinute.idVoters.split(',').map((id: string | number) => +id);
  if (this.isIdValid(membersIds)) {
    console.error("Les IDs des membres de la minute sont invalides");
    return;
  }

  // Envoyez une requête POST pour créer la minute
  this.http.post('http://localhost:3000/minutes/', { idAssociation: associationId, date: this.newMinute.date, content: this.newMinute.content, idVoters: this.newMinute.idVoters })
    .subscribe(response => {
      // Rafraîchissez la liste des minutes
      this.ngOnInit();
      // Cachez le formulaire de création de minute
      this.createMinuteVisible = false;
      // Réinitialisez l'objet "newMinute"
      this.newMinute = {};
    });
}

isIdValid(id: number[]) {
  let valid: boolean = true;
  id.forEach(element => {
    console.log(this.members.find((member: { id: number; }) => member.id === element));
    if (this.members.find((member: { id: number; }) => member.id === element)) {
      valid = false;
      console.log("ID invalide--------------------------------------");
    }
  });
  return valid;
}
}
