import { Injectable, signal } from '@angular/core';

export interface Vehiculo {
  matricula: string;
  name_driver: string;
  tipo_usuario: string;
  area_estacionamiento: string;
}
//prueba
export interface AreaEstacionamiento {
  nombre: string;
  capacidad: number;
  vehiculos: Vehiculo[];
}

@Injectable({
  providedIn: 'root'
})

export class PaqueaderoServices {
  puerta_1: number = 7;
  puerta_2: number = 7;
  puerta_3: number = 6;


  vehiculos_puerta1 = signal<Vehiculo[]>(
    JSON.parse(localStorage.getItem('vehiculos_puerta1') || '[]')
  )
  vehiculos_puerta2 = signal<Vehiculo[]>(
    JSON.parse(localStorage.getItem('vehiculos_puerta2') || '[]')
  )
  vehiculos_puerta3 = signal<Vehiculo[]>(
    JSON.parse(localStorage.getItem('vehiculos_puerta3') || '[]')
  )

  guardarVehiculosEnLocalStorage(): void {
    localStorage.setItem('vehiculos_puerta1', JSON.stringify(this.vehiculos_puerta1()));
    localStorage.setItem('vehiculos_puerta2', JSON.stringify(this.vehiculos_puerta2()));
    localStorage.setItem('vehiculos_puerta3', JSON.stringify(this.vehiculos_puerta3()));
  }

  agregarVehiculo(vehiculo: Vehiculo, puerta: string): void {
    switch (puerta) {
      case 'puerta1':
        this.vehiculos_puerta1.update(lista => [...lista, vehiculo]);
        break;
      case 'puerta2':
        this.vehiculos_puerta2.update(lista => [...lista, vehiculo]);
        break;
      case 'puerta3':
        this.vehiculos_puerta3.update(lista => [...lista, vehiculo]);
        break;
      default:
        break;
    }
  }

  eliminarVehiculo(matricula: string, puerta: string): void {
    switch (puerta) {
      case 'puerta1':
        this.vehiculos_puerta1.update(lista => lista.filter(vehiculo => vehiculo.matricula !== matricula));
        break;
      case 'puerta2':
        this.vehiculos_puerta2.update(lista => lista.filter(vehiculo => vehiculo.matricula !== matricula));
        break;
      case 'puerta3':
        this.vehiculos_puerta3.update(lista => lista.filter(vehiculo => vehiculo.matricula !== matricula));
        break;
      default:
        break;
    }
    this.guardarVehiculosEnLocalStorage();
  }
  obtenerVehiculos(puerta: string): Vehiculo[] {
    switch (puerta) {
      case 'puerta1':
        return this.vehiculos_puerta1();
      case 'puerta2':
        return this.vehiculos_puerta2();
      case 'puerta3':
        return this.vehiculos_puerta3();
      default:
        return [];
    }
  }
}



