import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutenticadoUserService } from '../../services/auth'; // Importa el servicio de autenticación
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  rol: string = '';
  error: boolean = false;

  MensajeError: string = '';

  constructor(private router: Router, private auth: AutenticadoUserService) { }

  login(): void {
    console.log('Intentando iniciar sesión con:', this.email, this.password);
    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        if (res.success) {
          if (res.rol === 'admin') {
            console.log('Usuario autenticado ' + res.nombre + ' con rol: ' + res.rol + ' y correo: ' + res.email);
            this.guardarUsuario(res.nombre, res.email, res.rol);
            this.router.navigate(['/admin']);

          } else {
            this.router.navigate(['/usuario']);
            this.guardarUsuario(res.nombre, res.email, res.rol);
          }
        } else {
          this.MensajeError = 'Credenciales incorrectas';
        }
      },
      error: () => {
        this.MensajeError = 'Error al conectar con el servidor';
      }
    });
  }

  guardarUsuario(username: string, email: string, rol: string): void {
    this.auth.saveUserData(username, email, rol);
  }


};


