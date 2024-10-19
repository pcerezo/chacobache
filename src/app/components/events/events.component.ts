import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { EventsService } from '../../services/events.service';
import { HttpClient, HttpClientModule, withFetch } from '@angular/common/http';
import { Evento } from '../../models/evento';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [MatCardModule, CommonModule, HttpClientModule, MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
  providers: [EventsService]
})
export class EventsComponent {
  eventosFuturos: Evento[] = [];
  eventosPasados: Evento[] = [];
  contactForm: FormGroup;

  constructor(private eventsService: EventsService, private fb: FormBuilder) {
    eventsService.getEventosFuturos().subscribe((eventos) => {
      this.eventosFuturos = eventos;
    });

    eventsService.getEventosPasados().subscribe((eventos) => {
      this.eventosPasados = eventos;
    });

    this.contactForm = this.fb.group({
      nombre : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
      mensaje : new FormControl ('', [Validators.required])
    });
  }

  get nombre() {
    return this.contactForm.get("nombre");
  }

  get email() {
    return this.contactForm.get("email");
  }

  get mensaje() {
    return this.contactForm.get("mensaje");
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Formulario enviado:', this.contactForm.value);
      this.eventsService.enviarEmailProduccion(this.contactForm.value).subscribe((resultado) => {
        console.log("Resultado del envío: " + resultado);
      });
      // Aquí puedes añadir la lógica para enviar los datos al backend
    } else {
      console.log('Formulario no válido');
      this.contactForm.markAllAsTouched();  // Marca todos los campos como tocados
    }
  }
}
