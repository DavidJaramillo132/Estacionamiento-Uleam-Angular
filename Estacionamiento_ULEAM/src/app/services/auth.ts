import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutenticadoUserService {
  private apiUrl = 'http://localhost:3000/api/login';

  username = signal<string | null>(localStorage.getItem('user'));
  rol = signal<string | null>(localStorage.getItem('rol'));
  email = signal<string | null>(localStorage.getItem('email'));
  reservacion = signal<boolean>(localStorage.getItem('reservacion') === 'true');
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password });
  }

  saveUserData(username: string, email: string, rol: string): void {
    localStorage.setItem('user', username);
    localStorage.setItem('email', email);
    localStorage.setItem('rol', rol);
    localStorage.setItem('reservacion', this.reservacion().toString());
    this.username.set(username);
    this.email.set(email);
    this.rol.set(rol);
    this.reservacion.set(this.reservacion());
  }

  logout(): void {
    this.username.set(null);
    this.email.set(null);
    this.rol.set(null);

    // Limpiar también el localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
    localStorage.removeItem('reservacion');
    this.router.navigate(['/login']);
  }

  setReservacion(valor: boolean): void {
  this.reservacion.set(valor);
  localStorage.setItem('reservacion', valor.toString());
}


  getusername(): string | null {
    return this.username();
  }
  getEmail(): string | null {
    return this.email();
  }
  getRol(): string | null {
    return this.rol();
  }
  getReservacion(): boolean {
    console.log("Reservacion: ", this.reservacion());
  return this.reservacion();
}



}
