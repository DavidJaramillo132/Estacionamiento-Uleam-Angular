import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface Reservacion {
  email: string;
  reservacion_realizada: boolean;
  matricula: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticadoUserService {
  private apiLoginUrl = 'http://localhost:3000/api/login';
  private apiReservacionUrl = 'http://localhost:3000/api/reservacion';


  username = signal<string | null>(localStorage.getItem('user'));
  rol = signal<string | null>(localStorage.getItem('rol'));
  email = signal<string | null>(localStorage.getItem('email'));
  reservacion = signal<boolean>(localStorage.getItem('reservacion') === 'true');
  matricula = signal<string | null>(localStorage.getItem('matricula'));

  constructor(private http: HttpClient, private router: Router) { }


  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiLoginUrl, { email, password });
  }

  obtener_matricula(email: string): Observable<string | null> {
    return new Observable<string | null>((observer) => {
      this.http.get(`http://localhost:3000/api/usuario/${email}`).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.matricula.set(res.matricula);
            observer.next(res.matricula);
          } else {
            console.warn("Usuario no encontrado.");
            observer.next(null);
          }
          observer.complete();
        },
        error: (err) => {
          console.error("Error al obtener la matrícula:", err);
          observer.error(err);
        }
      });
    });
  }


  saveUserData(username: string, email: string, rol: string, reservacion: boolean, matricula: string): void {
    localStorage.setItem('user', username);
    localStorage.setItem('email', email);
    localStorage.setItem('rol', rol);
    localStorage.setItem('reservacion', reservacion.toString());
    localStorage.setItem('matricula', matricula);
    this.username.set(username);
    this.email.set(email);
    this.rol.set(rol);
    this.reservacion.set(reservacion);
    this.matricula.set(matricula);
  }


  logout(): void {
    this.username.set(null);
    this.email.set(null);
    this.rol.set(null);
    this.reservacion.set(false);
    this.matricula.set(null);

    localStorage.removeItem('user');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
    localStorage.removeItem('reservacion');
    localStorage.removeItem('matricula');

    this.router.navigate(['/login']);
  }

  getReservacionDesdeServidor(email: string): Observable<{ reservacion: boolean }> {
    const url = `${this.apiReservacionUrl}/${email}`;
    return this.http.get<{ reservacion: boolean }>(url);
  }


  setReservacion(reservacion: Reservacion): void {
    this.reservacion.set(reservacion.reservacion_realizada);
    localStorage.setItem('reservacion', reservacion.reservacion_realizada.toString());
    console.log("Reservación guardada:", this.reservacion());
  }


  refreshUserData(email: string): void {
    this.obtener_matricula(email).subscribe({
      next: (matricula) => {
        if (matricula) {
          this.matricula.set(matricula);
          localStorage.setItem('matricula', matricula);
        } else {
          this.matricula.set(null);
          localStorage.removeItem('matricula');
        }
      },
      error: (err) => {
        console.error('Error actualizando matrícula:', err);
      }
    });

    this.getReservacionDesdeServidor(email).subscribe({
      next: (res) => {
        this.reservacion.set(res.reservacion);
        localStorage.setItem('reservacion', res.reservacion.toString());
      },
      error: (err) => {
        console.error('Error actualizando reservación:', err);
      }
    });
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
    console.log("Reservación actual:", this.reservacion());
    return this.reservacion();
  }

  getmatricula(): string | null {
    return this.matricula();
  }



}
