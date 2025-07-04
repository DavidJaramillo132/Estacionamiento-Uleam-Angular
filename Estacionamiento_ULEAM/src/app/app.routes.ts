import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login'; 
import { App } from './app';
import { ParqueaderoAdmin } from './pages/parqueadero/parqueadero-admin/parqueadero-admin'; 
import { UsuarioNormal } from './pages/usuario-normal/usuario-normal';
export const routes: Routes = [
  { 
    path : "",
    children : [
      { path: 'login', component: LoginComponent }, // Página por defecto
    ]
  },
  {
    path: 'estudiante',
    component: UsuarioNormal
  },

  {path: 'admin', 
    component: ParqueaderoAdmin
  },
  
  { path: '**', redirectTo: '' } // Redirección para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
