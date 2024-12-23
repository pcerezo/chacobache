import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { EventsService } from '../../../../services/events.service';
import { Evento } from '../../../../models/evento';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaEventosComponent } from '../lista-eventos/lista-eventos.component';
import { EventUpdateService } from '../../../../services/event-update.service';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatOption, MatSelectModule],
  providers: [provideNativeDateAdapter(), ListaEventosComponent],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css'
})
export class EditarEventoComponent {

  eventoForm!: FormGroup;
  evento: Evento;
  id: number = 0;
  page_title: string;

  constructor(
      private fb: FormBuilder, 
      private route: ActivatedRoute, 
      private eventsService: EventsService, 
      private router: Router,
      private listaEventos: ListaEventosComponent,
      private eventUpdateService: EventUpdateService) {
    this.page_title = "Editar evento";
    this.evento = {lugar: '', fecha: new Date(), descripcion: '', enlace_pdf: '', enlace_entradas: '', tipo: '', id: 0};
    this.route.paramMap.subscribe(params => {
      this.id = + (params.get('id') || 0);
    });
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

    this.rellenarEvento(); // Cargar el evento después de inicializar el formulario
  }

  rellenarEvento() {
    this.eventsService.getEventoDetalles(this.id).subscribe((ev) => {
      if (ev) {
        this.evento = ev;
      } else {
        this.eventoVacio();
      }
      this.cargarFormulario(); // Cargar datos en el formulario
    });
  }

  cargarFormulario() {
    // Asignar los valores del evento al formulario
    this.eventoForm.patchValue({
      lugar: this.evento.lugar,
      fecha: this.evento.fecha,
      descripcion: this.evento.descripcion,
      enlace_pdf: this.evento.enlace_pdf,
      enlace_entradas: this.evento.enlace_entradas,
      tipo: this.evento.tipo
    });

    // Validar manualmente cada campo del formulario
    Object.keys(this.eventoForm.controls).forEach(field => {
      const control = this.eventoForm.get(field);
      if (control) {
        control.markAsTouched(); // Marcar como tocado
        control.updateValueAndValidity(); // Forzar la validación
      }
    });
  }

  eventoVacio() {
    this.evento.descripcion = '';
    this.evento.enlace_entradas = '',
    this.evento.enlace_pdf =  '',
    this.evento.fecha = new Date(),
    this.evento.id = 0,
    this.evento.lugar = '',
    this.evento.tipo = ''
  }

  onSubmit(): void {
    if (this.eventoForm && this.eventoForm.valid) {
      const eventoData = this.eventoForm.value;
      this.eventsService.actualizarEvento(this.evento.id, eventoData).subscribe((resultado) => {
        this.eventUpdateService.notifyEventUpdated();
        console.log('Resultado:', resultado);
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
