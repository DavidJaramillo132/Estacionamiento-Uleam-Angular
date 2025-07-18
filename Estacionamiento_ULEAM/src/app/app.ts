import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, HttpClientModule, Navbar],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected title = 'Estacionamiento_ULEAM';
}
