import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventUpdateService } from '../../../../services/event-update.service';
import { MultimediaService } from '../../../../services/multimedia.service';
import { Multimedia } from '../../../../models/multimedia';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ListaEventosComponent } from '../../eventos/lista-eventos/lista-eventos.component';
import { DatePipe } from '@angular/common';
import { EventsService } from '../../../../services/events.service';

@Component({
  selector: 'app-crear-editar-multimedia-modal',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatOption, MatSelectModule, DatePipe],
  providers: [provideNativeDateAdapter(), ListaEventosComponent],
  templateUrl: './crear-editar-multimedia-modal.component.html',
  styleUrl: './crear-editar-multimedia-modal.component.css'
})
export class CrearEditarMultimediaModalComponent {
  multimediaForm!: FormGroup;
  id: number = 0;
  page_title: string;
  listaEventos: any[] = [];

  constructor(
      private fb: FormBuilder, 
      private route: ActivatedRoute, 
      private multimediaService: MultimediaService, 
      private router: Router,
      private eventUpdateService: EventUpdateService,
      private eventosService: EventsService) {
    this.page_title = "Contenido multimedia";
    this.route.paramMap.subscribe(params => {
      this.id = + (params.get('id') || 0);
    });
    this.cargarDatosFormulario();
  }

  ngOnInit(): void {
    this.multimediaForm = this.fb.group({
      id_evento: ['', Validators.required],
      enlace_contenido: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  cargarDatosFormulario() {
    this.eventosService.getAllEventos().subscribe((lista) => {
        if (lista) {
          this.listaEventos = lista;
        }
    });
  }
  

  onSubmit(): void {
    if (this.multimediaForm && this.multimediaForm.valid) {
      const multimediaData = this.multimediaForm.value;
      if (this.id && this.id > 0) {
        this.multimediaService.actualizarMultimedia(this.id, multimediaData).subscribe((resultado) => {
          this.eventUpdateService.notifyEventUpdated();
          console.log('Resultado:', resultado);
        });
      } else {
        this.multimediaService.crearMultimedia(multimediaData).subscribe((resultado) => {
          this.eventUpdateService.notifyEventUpdated();
          console.log('Resultado:', resultado);
        });
      }
      this.router.navigate(['/admin/multimedia'], { queryParams: { t: new Date().getTime() } });
    }
  }

  onCancel(): void {
    if (this.multimediaForm) {
      this.multimediaForm.reset();
    }
  }

  volver(): void {
    this.router.navigate(['/admin/multimedia']);
  }
}
