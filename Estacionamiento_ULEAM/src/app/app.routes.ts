import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login'; 
import { ParqueaderoAdmin } from './pages/parqueadero/parqueadero-admin/parqueadero-admin'; 
import { UsuarioNormal } from './pages/usuario-normal/usuario-normal';
import { Authseguridad } from './seguridad/auth-guard';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir raíz a /login

  { path: 'login', component: LoginComponent }, // Componente de login

  { path: 'usuario', 
    component: UsuarioNormal,
    canActivate: [Authseguridad],
    data: { rol: 'estudiante'}
   },

  { path: 'admin', 
    component: ParqueaderoAdmin,
    canActivate: [Authseguridad],
    data: { rol: 'administrativo'}
   },

  { path: '**', redirectTo: 'login' } // Redirección para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
