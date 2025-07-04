import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParqueaderoService } from '../../../services/paqueadero-services';
import { FormsModule } from '@angular/forms';
import { AutenticadoUserService } from '../../../services/auth'; // Importa el servicio de autenticación
@Component({
  selector: 'app-formulario',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss'
})

export class Formulario implements OnInit {
  matricula: string = '';
  name_driver: string = '';
  tipo_conductor: string = '';
  area_estacionamiento: string = '';
  hora_entrada: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  matriculaRegex = /^[A-Z]{3}-\d{4}$/;
  rol: string = '';

  constructor(private paqueaderoService: ParqueaderoService, public auth: AutenticadoUserService) { }

  get puerta_seleccionada() {
    return this.paqueaderoService.areas().find(area => area.nombre === this.area_estacionamiento);
  }
  ngOnInit(): void {

  }


  fomulario_validaciones(): boolean {
    if (!this.matricula || !this.name_driver || !this.tipo_conductor || !this.area_estacionamiento) {
      alert('Por favor, complete todos los campos.');
      return false;
    }

    if (!this.matriculaRegex.test(this.matricula)) {
      alert('La matrícula debe tener el formato AAA-0000 ');
      return false;
    }
    if (this.paqueaderoService.areas().some(area => area.vehiculos.some(vehiculo => vehiculo.matricula === this.matricula))) {
      alert('La matrícula ya está registrada en el sistema.');
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

    if (this.puerta_seleccionada && this.puerta_seleccionada.vehiculos.length >= this.puerta_seleccionada.capacidad) {
      alert('No hay espacio disponible en la ' + this.area_estacionamiento);
      return false;
    }

    return true;
  }

  addcar_admin(): void {
    if (this.fomulario_validaciones()) {
      const vehiculo = {
        matricula: this.matricula,
        name_driver: this.name_driver,
        tipo_usuario: this.tipo_conductor,
        area_estacionamiento: this.area_estacionamiento,
        hora_entrada: this.hora_entrada
      };
      alert('Vehículo agregado correctamente');
      this.paqueaderoService.agregarVehiculo(vehiculo, this.area_estacionamiento);
      this.paqueaderoService.guardarVehiculosEnLocalStorage();
      this.resetForm();
    } else {
      alert('Por favor, corrija los errores en el formulario.');
    }
  }

  addcar_noAdmin(): void {
    if(this.fomulario_validaciones()) {
      const vehiculo = {
        matricula: this.matricula,
        name_driver: this.auth.username()!,
        tipo_usuario: this.auth.rol()!,
        area_estacionamiento: this.area_estacionamiento,
        hora_entrada: this.hora_entrada
      };
      alert('Vehículo agregado correctamente');
      this.paqueaderoService.agregarVehiculo(vehiculo, this.area_estacionamiento);
      this.paqueaderoService.guardarVehiculosEnLocalStorage();
      this.resetForm();
    }
  }

  resetForm(): void {
    this.matricula = '';
    this.name_driver = '';
    this.tipo_conductor = '';
    this.area_estacionamiento = '';
  }

}
