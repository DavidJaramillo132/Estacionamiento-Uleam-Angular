import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutenticadoUserService } from '../../services/auth';
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
    console.log('Intentando iniciar sesion con:', this.email, this.password);
    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        if (res.success) {
          if (res.rol === 'administrativo') {
            this.guardarUsuario(res.nombre, res.email, res.rol, res.estacionamiento, res.matricula);
            this.router.navigate(['/admin']);

          } else {
            this.guardarUsuario(res.nombre, res.email, res.rol, res.estacionamiento, res.matricula);
            this.router.navigate(['/usuario']);
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
  guardarUsuario(username: string, email: string, rol: string, reservacion: boolean, matricula: string): void {

    this.auth.saveUserData(username, email, rol, reservacion, matricula);
  }
};
