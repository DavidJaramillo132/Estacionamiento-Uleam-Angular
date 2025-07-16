import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParqueaderoService } from '../../../services/paqueadero-services';
import { FormsModule } from '@angular/forms';
import { AutenticadoUserService } from '../../../services/auth';
import { ReservacionesServices } from '../../../services/reservaciones-services';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.html',
  styleUrls: ['./formulario.scss'] // Corregido aquí
})
export class Formulario implements OnInit {
  matricula: string = '';
  name_driver: string = '';
  tipo_conductor: string = '';
  email_driver: string = '';
  area_estacionamiento: string = '';
  hora_llegada: string = '';
  hora_entrada: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  rol: string = '';
  reservacion: boolean = false;

  matriculaRegex = /^[A-Z]{3}-\d{4}$/;

  constructor(
    private paqueaderoService: ParqueaderoService,
    public auth: AutenticadoUserService,
    private reservacionesService: ReservacionesServices
  ) { }

  ngOnInit(): void {
    this.reservacion = this.auth.getReservacion() || false;
    this.matricula = this.auth.getmatricula() || '';
  }

  get puerta_seleccionada() {
    return this.paqueaderoService.areas().find(area => area.nombre === this.area_estacionamiento);
  }

  fomulario_validaciones(): boolean {
    if (!this.matricula || !this.name_driver || !this.tipo_conductor || !this.area_estacionamiento) {
      alert('Por favor, complete todos los campos.');
      return false;
    }

    if (!this.matriculaRegex.test(this.matricula)) {
      alert('La matrícula debe tener el formato AAA-0000');
      return false;
    }

    if (this.paqueaderoService.areas().some(area =>
      area.vehiculos.some(vehiculo => vehiculo.matricula === this.matricula)
    )) {
      alert('La matrícula ya está registrada en el sistema.');
      return false;
    }

    if (this.name_driver.length > 50) {
      alert('El nombre del conductor no puede exceder los 50 caracteres.');
      return false;
    }

    const tiposValidos = ['estudiante', 'docente', 'administrativo', 'visitante'];
    if (!tiposValidos.includes(this.tipo_conductor)) {
      alert('Tipo de conductor no válido.');
      return false;
    }

    if (this.puerta_seleccionada &&
      this.puerta_seleccionada.vehiculos.length >= this.puerta_seleccionada.capacidad) {
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
        email_driver: '',
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
    const email = this.auth.getEmail() || '';
    const matricula = this.matricula;

    if (!email || !matricula) {
      alert("Email o matrícula no disponibles.");
      return;
    }

    this.name_driver = this.auth.username()!;
    this.tipo_conductor = this.auth.rol()!;
    this.hora_llegada = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!this.fomulario_validaciones()) {
      return;
    }

    const reservacion = {
      email,
      reservacion_realizada: true,
      matricula
    };

    const vehiculo = {
      matricula,
      name_driver: this.name_driver,
      email_driver: email,
      tipo_usuario: this.tipo_conductor,
      area_estacionamiento: this.area_estacionamiento,
      hora_entrada: this.hora_llegada
    };

    this.paqueaderoService.agregarVehiculo(vehiculo, this.area_estacionamiento);
    this.paqueaderoService.guardarVehiculosEnLocalStorage();
    this.resetForm();
    alert('Vehículo agregado correctamente');

    this.reservacionesService.enviarReservacion(reservacion).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.reservacion = true;
          this.auth.setReservacion(reservacion);
          this.auth.refreshUserData(email);
        } else {
          console.error("No se pudo actualizar la reservación");
        }
      },
      error: (err) => {
        console.error("Error al conectar con el backend:", err);
      }
    });
  }

  cancelarReservacion(): void {
    const email = this.auth.getEmail() || '';
    const matricula = this.auth.getmatricula() || '';
    const reservacion = {
      email,
      reservacion_realizada: false,
      matricula
    };

    this.auth.setReservacion(reservacion);

    const areaDetectada = this.paqueaderoService.areas().find(area =>
      area.vehiculos.some(v =>
        v.matricula === matricula && v.email_driver === email
      )
    )?.nombre;

    if (!areaDetectada) {
      console.error("No se pudo determinar el área de estacionamiento del vehículo");
      alert("Error al cancelar: No se pudo encontrar el vehículo");
      return;
    }

    this.paqueaderoService.eliminarVehiculo(matricula, areaDetectada, email);

    this.reservacionesService.enviarReservacion(reservacion).subscribe({
      next: (res: any) => {
        if (res.success) {
          console.log("Reservación cancelada correctamente en el backend.");
        } else {
          console.error("No se pudo actualizar la reservación en el backend.");
        }
      },
      error: (err) => {
        console.error("Error al cancelar la reservación:", err);
      }
    });

    alert('Reservación cancelada');
  }

  resetForm(): void {
    this.matricula = '';
    this.name_driver = '';
    this.tipo_conductor = '';
    this.area_estacionamiento = '';
    this.hora_llegada = '';
  }
}
