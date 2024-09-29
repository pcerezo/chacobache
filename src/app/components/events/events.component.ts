import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { EventsService } from '../../services/events.service';
import { HttpClient, HttpClientModule, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [MatCardModule, CommonModule, HttpClientModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
  providers: [EventsService]
})
export class EventsComponent {
  eventosFuturos: any[] = [];
  eventosPasados: any[] = [];

  constructor(private eventsService: EventsService) {
    eventsService.getEventosFuturos().subscribe((eventos) => {
      this.eventosFuturos = eventos;
    });

    eventsService.getEventosPasados().subscribe((eventos) => {
      this.eventosPasados = eventos;
    });
  }
}
