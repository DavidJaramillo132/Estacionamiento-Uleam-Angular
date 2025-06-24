import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login'; // Asegúrate de que la ruta sea correcta
import { App } from './app';
import { ParqueaderoAdmin } from './pages/parqueadero-admin/parqueadero-admin'; // Asegúrate de que la ruta sea correcta

export const routes: Routes = [
  { 
    path : "",
    children : [
      { path: 'login', component: LoginComponent }, // Página por defecto
    ]
  },
  {
    path: 'admin',
    component: ParqueaderoAdmin
  },
  
  { path: '**', redirectTo: '' } // Redirección para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
