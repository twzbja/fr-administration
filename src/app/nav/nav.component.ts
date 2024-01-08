import { Component, OnInit, Input } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-nav',
templateUrl: './nav.component.html',
styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() isLogged: boolean= false;

  constructor(
  private tokenStorageService: TokenStorageService,
  private router: Router
  ) { }

  ngOnInit(): void {
  this.isLogged = this.tokenStorageService.isLogged();
  }

  logout(): void {
  this.tokenStorageService.clear();
  this.router.navigateByUrl('/login');
  }
}

