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
import { error } from 'node:console';

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
  envioExistoso: Boolean | undefined;
  envioErroneo: Boolean | undefined;
  enviado: Boolean | undefined;

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

    this.envioExistoso = undefined;
    this.envioErroneo = undefined;
    this.enviado = false;
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
        if (resultado.status == "200") {
          this.envioExistoso = true;
          this.enviado = true;
          //this.fadeInAndOut("envioExitoso");
        }
        else {
          this.envioErroneo = true;
          console.log("(resultado) => envioErroneo");
          //this.fadeInAndOut("envioFallido");
        }
        console.log("Resultado del envío: " + resultado.message);
      },
      (error) => {
        this.envioErroneo = true;
        console.log("error en el envío: " + error);
      });
      // Aquí puedes añadir la lógica para enviar los datos al backend
    } else {
      console.log('Formulario no válido');
      this.contactForm.markAllAsTouched();  // Marca todos los campos como tocados
    }
  }

  ngAfterViewChecked() {
    if (this.envioExistoso) {
      this.fadeInAndOut('envioExitoso');
    }

    if (this.envioErroneo) {
      this.fadeInAndOut('envioFallido');
    }
  }

  fadeInAndOut(divId: string): void {
    const element = document.getElementById(divId);
    
    if (element) {
        // Asegurar que element tiene tipo HTMLElement para aplicar la clase
        (element as HTMLElement).classList.add('show');

        // Esperar 5 segundos (5000 milisegundos) antes de desvanecerlo
        setTimeout(() => {
            (element as HTMLElement).classList.remove('show');
        }, 5000); // Cambia este valor para ajustar el tiempo que el div permanece visible
    }
    this.envioExistoso = undefined;
    this.envioErroneo = undefined;
  }
}
