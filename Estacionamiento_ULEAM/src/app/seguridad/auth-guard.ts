import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AutenticadoUserService } from '../services/auth';

@Injectable({ providedIn: 'root' })

export class Authseguridad implements CanActivate {

    constructor(private router: Router, private authService: AutenticadoUserService) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const rolNecesario = route.data['rol'] as string;
        const rolUsuario = this.authService.getRol();

        if (rolUsuario === rolNecesario) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}

