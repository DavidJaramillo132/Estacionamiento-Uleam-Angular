import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AutenticadoUserService } from '../../../services/auth'; // Importa el servicio de autenticación

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})

export class Navbar {
  username: string = '';
  email: string = '';
  rol: string = '';
  constructor(private router: Router, public auth: AutenticadoUserService) {}
  
  logout(): void {
    this.auth.logout();
  }
}
