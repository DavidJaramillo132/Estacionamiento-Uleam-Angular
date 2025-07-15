import { Component } from '@angular/core';
import { Formulario } from '../parqueadero/formulario/formulario';
import { ParqueaderoNoAdmin } from '../parqueadero/parqueadero-no-admin/parqueadero-no-admin';
@Component({
  selector: 'app-usuario-normal',
  imports: [Formulario],
  templateUrl: './usuario-normal.html',
  styleUrl: './usuario-normal.scss'
})
export class UsuarioNormal {

}
