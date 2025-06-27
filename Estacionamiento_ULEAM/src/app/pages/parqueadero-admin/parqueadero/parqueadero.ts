import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaqueaderoServices } from '../../../services/paqueadero-services';
import { FormsModule } from '@angular/forms';@Component({
  selector: 'app-parqueadero',
  imports: [CommonModule, FormsModule],
  templateUrl: './parqueadero.html',
  styleUrl: './parqueadero.scss'
})
export class Parqueadero {
  busqueda: any = '';
  
  getBorderColor(tipo_conductor: string): void {

    
  }

  registrarSalida(matricula: string): void {
    // Lógica para registrar la salida del vehículo
  }

  puertas(): string[]{
    return ['Puerta 1', 'Puerta 2', 'Puerta 3']
  }
  
}
