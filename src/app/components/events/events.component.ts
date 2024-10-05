import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { EventsService } from '../../services/events.service';
import { HttpClient, HttpClientModule, withFetch } from '@angular/common/http';
import { Evento } from '../../models/evento';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [MatCardModule, CommonModule, HttpClientModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
  providers: [EventsService]
})
export class EventsComponent {
  eventosFuturos: Evento[] = [];
  eventosPasados: Evento[] = [];

  constructor(private eventsService: EventsService) {
    eventsService.getEventosFuturos().subscribe((eventos) => {
      this.eventosFuturos = eventos;
    });

    eventsService.getEventosPasados().subscribe((eventos) => {
      this.eventosPasados = eventos;
    });
  }
}
