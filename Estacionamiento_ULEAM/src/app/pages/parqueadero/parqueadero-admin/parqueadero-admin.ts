import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParqueaderoService } from '../../../services/paqueadero-services';
import { FormsModule } from '@angular/forms';
import { AreaEstacionamiento } from '../../../services/paqueadero-services';
import { Formulario } from '../formulario/formulario';
@Component({
  selector: 'app-parqueadero-admin',
  imports: [CommonModule, FormsModule, Formulario],
  templateUrl: './parqueadero-admin.html',
  styleUrl: './parqueadero-admin.scss'
})


export class ParqueaderoAdmin {

  constructor(private parqueaderoServices: ParqueaderoService) { }

  registrarSalida(matricula: string): void {
    // Buscar el área donde está el vehículo
    const area = this.parqueaderoServices.areas().find(area =>
      area.vehiculos.some(vehiculo => vehiculo.matricula === matricula)
    );

    if (!area) {
      alert(`Vehículo con matrícula ${matricula} no encontrado.`);
      return;
    }

    // Usar el método del servicio para eliminarlo correctamente
    this.parqueaderoServices.eliminarVehiculo(matricula, area.nombre);
    alert(`Vehículo con matrícula ${matricula} ha salido del parqueadero.`);
  }

  puertas(): AreaEstacionamiento[] {
    return this.parqueaderoServices.areas();
  }

  getCarrosEstacionados(puerta: string): number {
    const area = this.parqueaderoServices.areas().find(area => area.nombre === puerta);
    return area ? area.vehiculos.length : 0;
  }

}