import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaqueaderoServices } from '../../../services/paqueadero-services';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-formulario',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss'
})
export class Formulario {
  matricula: string = '';
  name_driver: string = '';
  tipo_conductor: string = '';
  area_estacionamiento: string = '';
  matriculaRegex = /^[A-Z]{3}-\d{4}$/;


  constructor(private paqueaderoService: PaqueaderoServices) { }

  fomulario_validaciones() {
    if (!this.matricula || !this.name_driver || !this.tipo_conductor || !this.area_estacionamiento) {
      alert('Por favor, complete todos los campos.');
      return false;
    }

    if (!this.matriculaRegex.test(this.matricula)) {
      alert('La matricula debe tener el formato AAA-0000');
      return false;
    }

    if (this.name_driver.length > 50) {
      alert('El nombre del conductor no puede exceder los 50 caracteres.');
      return false;
    }

    if (this.tipo_conductor !== 'Estudiante' && this.tipo_conductor !== 'Docente' &&
      this.tipo_conductor !== 'Administrativo' && this.tipo_conductor !== 'Visitante') {
      alert('Tipo de conductor no válido.');
      return false;
    }

    if (this.paqueaderoService.puerta_1 <= 0 && this.area_estacionamiento === 'puerta1') {
      alert('No hay espacio disponible en la puerta 1.');
      return false;
    }
    if (this.paqueaderoService.puerta_2 <= 0 && this.area_estacionamiento === 'puerta2') {
      alert('No hay espacio disponible en la puerta 2.');
      return false;
    }
    if (this.paqueaderoService.puerta_3 <= 0 && this.area_estacionamiento === 'puerta3') {
      alert('No hay espacio disponible en la puerta 3.');
      return false;
    }

    return true;
  }

  addcar(): void {
    if (this.fomulario_validaciones()) {
      const vehiculo = {
        matricula: this.matricula,
        name_driver: this.name_driver,
        tipo_usuario: this.tipo_conductor,
        area_estacionamiento: this.area_estacionamiento
      };
      alert('Vehículo agregado correctamente');
      this.paqueaderoService.agregarVehiculo(vehiculo, this.area_estacionamiento);
      this.paqueaderoService.guardarVehiculosEnLocalStorage();
      this.resetForm();
    } else {
      alert('Por favor, corrija los errores en el formulario.');
    }
  }

  resetForm() {
    this.matricula = '';
    this.name_driver = '';
    this.tipo_conductor = '';
    this.area_estacionamiento = '';
  }

}
