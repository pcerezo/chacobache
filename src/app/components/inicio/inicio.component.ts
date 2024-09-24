import { Component } from '@angular/core';
import { AboutComponent } from "../about/about.component";
import { ServicesComponent } from "../../services/services.component";
import { ProgramComponent } from "../program/program.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [AboutComponent, ServicesComponent, ProgramComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
