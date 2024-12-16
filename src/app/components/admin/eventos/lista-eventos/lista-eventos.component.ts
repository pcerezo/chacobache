import { Component } from '@angular/core';
import { EventsService } from '../../../../services/events.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TruncatePipe } from '../../../../truncate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [MatCardModule, CommonModule, HttpClientModule, MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, TruncatePipe, RouterLink],
  templateUrl: './lista-eventos.component.html',
  styleUrl: '../../../events/events.component.css'
})
export class ListaEventosComponent {
  listaEventos: any[] = [];
  constructor(private eventosService: EventsService) {
    this.eventosService.getAllEventos().subscribe((lista) => {
      if (lista) {
        this.listaEventos = lista;
      }
    });
  }


}
