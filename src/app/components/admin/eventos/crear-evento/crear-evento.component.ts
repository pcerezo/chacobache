import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Evento } from '../../../../models/evento';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EventsService } from '../../../../services/events.service';
import { Router } from '@angular/router';
import { ListaEventosComponent } from '../lista-eventos/lista-eventos.component';
import { EventUpdateService } from '../../../../services/event-update.service';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatOption, MatSelectModule],
  providers: [provideNativeDateAdapter(), ListaEventosComponent],
  templateUrl: '../editar-evento/editar-evento.component.html',
  styleUrl: '../editar-evento/editar-evento.component.css'
})
export class CrearEventoComponent {
  eventoForm!: FormGroup;
  evento: Evento;
  id: number = 0;
  page_title: string;

  constructor(
      private fb: FormBuilder, 
      private eventsService: EventsService, 
      private router: Router,
      private listaEventos: ListaEventosComponent,
      private eventUpdateService: EventUpdateService) {
    this.page_title = "Crear evento";
    this.evento = {lugar: '', fecha: new Date(), descripcion: '', enlace_pdf: '', enlace_entradas: '', tipo: '', id: 0};
  }

  ngOnInit(): void {
      this.eventoForm = this.fb.group({
        lugar: ['', Validators.required],
        fecha: ['', Validators.required],
        descripcion: ['', Validators.required],
        enlace_pdf: [''],
        enlace_entradas: [''],
        tipo: ['', Validators.required]
      });
  
    }

    onSubmit(): void {
      if (this.eventoForm && this.eventoForm.valid) {
        const eventoData = this.eventoForm.value;
        this.eventsService.crearEvento(eventoData).subscribe((resultado) => {
          this.eventUpdateService.notifyEventUpdated();
          console.log('Resultado: ', resultado);
        });
        this.router.navigate(['/admin/eventos'], { queryParams: { t: new Date().getTime() } });
      }
    }
  
    onCancel(): void {
      if (this.eventoForm) {
        this.eventoForm.reset();
      }
    }
}
