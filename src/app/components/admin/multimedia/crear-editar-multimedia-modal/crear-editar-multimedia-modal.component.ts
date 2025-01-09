import { Component, Inject } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  //id: number = 0;
  page_title: string;
  listaEventos: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private multimediaService: MultimediaService, 
    private router: Router,
    private eventUpdateService: EventUpdateService,
    private eventosService: EventsService,
    public dialogRef: MatDialogRef<CrearEditarMultimediaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
    this.page_title = "Contenido multimedia";
    /*this.route.paramMap.subscribe(params => {
      this.id = + (params.get('id') || 0);
    });*/
  }

  ngOnInit(): void {
    this.multimediaForm = this.fb.group({
      id_evento: [this.data.id_evento, Validators.required],
      enlace_contenido: [this.data.enlace_contenido, Validators.required],
      descripcion: [this.data.descripcion, Validators.required]
    });

    this.cargarDatosFormulario();
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
      if (this.data.id) {
        this.multimediaService.actualizarMultimedia(this.data.id, multimediaData).subscribe((resultado) => {
          this.eventUpdateService.notifyEventUpdated();
          this.dialogRef.close(true);
        });
      } else {
        this.multimediaService.crearMultimedia(multimediaData).subscribe((resultado) => {
          this.eventUpdateService.notifyEventUpdated();
          console.log('Añadir multimedia. Resultado:', resultado);
          this.dialogRef.close(true);
        });

        //this.router.navigate(['/admin/multimedia'], { queryParams: { t: new Date().getTime() } });
      }
    }
  }

  onCancel(): void {
    if (this.multimediaForm) {
      this.multimediaForm.reset();
    }
  }

  onEliminar(): void {
    if (this.data.id) {
      this.multimediaService.eliminarMultimedia(this.data.id).subscribe((resultado) => {
        this.eventUpdateService.notifyEventUpdated();
        console.log('Eliminar multimedia. Resultado:', resultado);
        this.dialogRef.close(true);
      });
    }
  }

  volver(): void {
    this.router.navigate(['/admin/multimedia']);
  }
}
