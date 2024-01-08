import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private route: Router
  ) { 
    this.isLoggedIn = tokenStorageService.isLogged();
  }

  ngOnInit(): void {
  }


  openAssociations() {
    //this.route.navigate(['/associations']);
  }

}
