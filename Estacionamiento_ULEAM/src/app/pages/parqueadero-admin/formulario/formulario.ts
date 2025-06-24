import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario',
  imports: [],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss'
})
export class Formulario {

  addCar() {
    // Logic to add a car
    console.log('Car added');
  }

}
