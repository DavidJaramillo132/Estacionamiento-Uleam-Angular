import { Component } from '@angular/core';
import { Formulario } from './formulario/formulario';
import { Parqueadero } from './parqueadero/parqueadero';
@Component({
  selector: 'app-parqueadero-admin',
  imports: [Formulario, Parqueadero],
  templateUrl: './parqueadero-admin.html',
  styleUrl: './parqueadero-admin.scss'
})
export class ParqueaderoAdmin {

  
}
