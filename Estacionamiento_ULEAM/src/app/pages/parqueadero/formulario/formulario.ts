import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParqueaderoService } from '../../../services/paqueadero-services';
import { FormsModule } from '@angular/forms';
import { AutenticadoUserService } from '../../../services/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss'
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
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.reservacion = this.auth.getReservacion() || false;
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

    const tiposValidos = ['estudiante', 'docente', 'admin', 'visitante'];
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
        email_driver: "",
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
    const reservacion = {
      email: this.auth.getEmail() || '',
      reservacion_realizada: true
    };
    this.name_driver = this.auth.username()!;
    this.tipo_conductor = this.auth.rol()!;
    this.hora_llegada = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (this.fomulario_validaciones()) {
      const vehiculo = {
        matricula: this.matricula,
        name_driver: this.name_driver,
        email_driver: this.auth.getEmail() || '',
        tipo_usuario: this.tipo_conductor,
        area_estacionamiento: this.area_estacionamiento,
        hora_entrada: this.hora_llegada
      };

      this.paqueaderoService.agregarVehiculo(vehiculo, this.area_estacionamiento);
      this.paqueaderoService.guardarVehiculosEnLocalStorage();
      this.resetForm();
      alert('Vehículo agregado correctamente');

      // Actualizar en la base de datos que el usuario ya reservó
      const email = this.auth.getEmail();
      const reservacion_realizada = true;
      console.log("Reservacion realizada: ", reservacion_realizada, " Email: ", email);
      if (email) {
        this.http.post('http://localhost:3000/api/reservar', { reservacion_realizada, email }).subscribe((res: any) => {
          if (res.success) {
            this.reservacion = true;
            this.auth.setReservacion(reservacion); 
          } else {
            console.error("No se pudo actualizar la reservacion");
          }
        });
      }
    }
  }

  cancelarReservacion(): void {
    const reservacion_realizada = false;
    const reservacion = {
      email: this.auth.getEmail() || '',
      reservacion_realizada: false
    };
    this.auth.setReservacion(reservacion);
    localStorage.setItem('reservacion', 'false');

    this.paqueaderoService.eliminarVehiculo(this.matricula, this.area_estacionamiento, reservacion.email);

    if (reservacion.email){
        this.http.post('http://localhost:3000/api/reservar', { reservacion_realizada, email: reservacion.email }).subscribe((res: any) => {
          if (res.success) {
            this.reservacion = true;
            this.auth.setReservacion(reservacion); 
          } else {
            console.error("No se pudo actualizar la reservacion");
          }
        });
    }


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
