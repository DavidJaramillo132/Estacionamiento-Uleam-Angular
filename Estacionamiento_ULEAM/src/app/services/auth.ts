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

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password });
  }

  saveUserData(username: string, email: string, rol: string): void {
    localStorage.setItem('user', username);
    localStorage.setItem('email', email);
    localStorage.setItem('rol', rol);
    this.username.set(username);
    this.email.set(email);
    this.rol.set(rol);
  }

  logout(): void {
    localStorage.clear();
    this.username.set(null);
    this.email.set(null);
    this.rol.set(null);
    this.router.navigate(['/login']);
  }
}
