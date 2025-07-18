import { Injectable, signal } from '@angular/core';

export interface Vehiculo {
  matricula: string;
  name_driver: string;
  email_driver: string;
  tipo_usuario: string;
  area_estacionamiento: string;
  hora_entrada: string;
}

export interface AreaEstacionamiento {
  nombre: string;
  capacidad: number;
  vehiculos: Vehiculo[];
}

@Injectable({
  providedIn: 'root'
})
export class ParqueaderoService {

  // Lista de areas de estacionamiento usando la interfaz
  areas = signal<AreaEstacionamiento[]>([
    {
      nombre: 'puerta1',
      capacidad: 7,
      vehiculos: JSON.parse(localStorage.getItem('vehiculos_puerta1') || '[]')
    },
    {
      nombre: 'puerta2',
      capacidad: 7,
      vehiculos: JSON.parse(localStorage.getItem('vehiculos_puerta2') || '[]')
    },
    {
      nombre: 'puerta3',
      capacidad: 6,
      vehiculos: JSON.parse(localStorage.getItem('vehiculos_puerta3') || '[]')
    }
  ]);

  guardarVehiculosEnLocalStorage(): void {
    for (const area of this.areas()) {
      localStorage.setItem(`vehiculos_${area.nombre}`, JSON.stringify(area.vehiculos));
    }
  }

  agregarVehiculo(vehiculo: Vehiculo, puerta: string): void {
    this.areas.update(areas =>
      areas.map(area => {
        if (area.nombre === puerta && area.vehiculos.length < area.capacidad) {
          return {
            ...area,
            vehiculos: [...area.vehiculos, vehiculo]
          };
        }
        return area;
      })
    );
    this.guardarVehiculosEnLocalStorage();
  }

  eliminarVehiculo(matricula: string, puerta: string, email: string): void {
    console.log("Eliminando vehiculo:", matricula, "de la puerta:", puerta, "para el usuario:", email);
    this.areas.update(areas =>
      areas.map(area => {
        if (area.nombre === puerta) {
          return {
            ...area,
            vehiculos: area.vehiculos.filter(vehiculo =>
              !(vehiculo.matricula === matricula && (email === '' || vehiculo.email_driver === email))
            )
          };
        }
        return area;
      })
    );

    this.guardarVehiculosEnLocalStorage();
  }

  obtenerVehiculos(puerta: string): Vehiculo[] {
    const area = this.areas().find(a => a.nombre === puerta);
    return area ? area.vehiculos : [];
  }

  obtenerArea(puerta: string): AreaEstacionamiento | undefined {
    return this.areas().find(a => a.nombre === puerta);
  }

}
