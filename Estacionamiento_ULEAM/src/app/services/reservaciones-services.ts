import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reservacion {
  email: string;
  reservacion_realizada: boolean;
  matricula: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservacionesServices {
  private apiUrl = 'https://estacionamiento-uleam-angular-server.onrender.com/api/reservar';

  constructor(private http: HttpClient) {}

  enviarReservacion(reservacion: Reservacion): Observable<any> {
    return this.http.post(this.apiUrl, reservacion);
  }
}
