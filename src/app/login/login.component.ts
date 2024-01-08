import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  waiting: boolean = false;
  errorMessage: string= '';

  constructor(
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService,   
    private route: Router
  ) {}

  ngOnInit(): void {
  }
  
  login(): void {
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    this.tokenStorageService.save
    this.api.post({
      endpoint: '/auth/login',
      data: { username, password },
    })
      .then((response) => {
        console.log(response);
        if (response.error) {
          this.errorMessage = 'Le nom d\'utilisateur ou le mot de passe est incorrect';
          return;
        }
        this.tokenStorageService.save(response.access_token, username);
        this.route.navigateByUrl('/home');
      })
      .catch((error: HttpErrorResponse) => {
        console.error(error);
        this.errorMessage = 'Une erreur s\'est produite lors de la connexion';
      });
  }
}

