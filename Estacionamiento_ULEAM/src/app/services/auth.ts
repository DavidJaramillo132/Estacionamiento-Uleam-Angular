import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface Reservacion {
  email: string;
  reservacion_realizada: boolean;
}

@Injectable({
  providedIn: 'root'
})


export class AutenticadoUserService  {
  private apiUrl = 'http://localhost:3000/api/login';

  
  username = signal<string | null>(localStorage.getItem('user'));
  rol = signal<string | null>(localStorage.getItem('rol'));
  email = signal<string | null>(localStorage.getItem('email'));
  reservacion = signal<boolean>(localStorage.getItem('reservacion') === 'true');
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password });
  }

  saveUserData(username: string, email: string, rol: string, reservacion: boolean): void {
    console.log('UUUUUUUUUUUUUUUUUUUUUUUU', reservacion);
    // const reservacionData = reservacion ?? false;
    console.log('UUUUUUUUUUUUUUUUUUUUUUUU', reservacion);
    localStorage.setItem('user', username);
    localStorage.setItem('email', email);
    localStorage.setItem('rol', rol);
    localStorage.setItem('reservacion', reservacion.toString());
    this.username.set(username);
    this.email.set(email);
    this.rol.set(rol);
    this.reservacion.set(reservacion);
  }

  logout(): void {
    this.username.set(null);
    this.email.set(null);
    this.rol.set(null);
    this
    // Limpiar también el localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
    localStorage.removeItem('reservacion');
    this.router.navigate(['/login']);
  }

  setReservacion(reservacion: Reservacion): void {
    this.reservacion.set(reservacion.reservacion_realizada);
    localStorage.setItem('reservacion', JSON.stringify(reservacion));
    console.log("Reservacion guardada: ", this.reservacion());
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
