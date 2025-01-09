import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { TruncatePipe } from '../../../../truncate.pipe';
import { PreguntasRespuestas } from '../../../../models/preguntasRespuestas';
import { PreguntaRespuestaService } from '../../../../services/pregunta-respuesta.service';
import { CrearPreguntaRespuestaComponent } from '../crear-pregunta-respuesta/crear-pregunta-respuesta.component';
import { MatDialog } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EventUpdateService } from '../../../../services/event-update.service';
import { ModalButtonTemplateComponent } from '../../../modals/eliminar-entidad/modal-button-template';

@Component({
  selector: 'app-lista-pregunta-respuesta',
  standalone: true,
  imports: [MatCardModule, 
    CommonModule, 
    HttpClientModule, 
    MatInputModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    ReactiveFormsModule,
    TruncatePipe],
  providers: [PreguntaRespuestaService, provideNativeDateAdapter()],
  templateUrl: './lista-pregunta-respuesta.component.html',
  styleUrl: './lista-pregunta-respuesta.component.css'
})
export class ListaPreguntaRespuestaComponent {
  listaPreguntasRespuestas: PreguntasRespuestas[] = [];
  readonly dialog = inject(MatDialog);
  
  constructor(
    private preguntaRespuestaService: PreguntaRespuestaService,
    private router: Router,
    private eventUpdateService: EventUpdateService
  ) {

  }

  ngOnInit(): void {
    this.cargarPreguntasRespuestas();
    this.eventUpdateService.eventUpdated$.subscribe(() => {
      this.cargarPreguntasRespuestas();
    });
  }

  cargarPreguntasRespuestas(): void {
    this.preguntaRespuestaService.getPreguntasRespuestas().subscribe((preguntasRespuestas) => {
      this.listaPreguntasRespuestas = preguntasRespuestas;
    });
  }

  addPreguntaRespuesta(): void {
    this.dialog.open(CrearPreguntaRespuestaComponent, {
      width: '600px',
      data: {id: 0}
    });
  }

  
  editPreguntaRespuesta(id: number): void {
    const data = this.listaPreguntasRespuestas.find((preguntaRespuesta) => preguntaRespuesta.id === id);
    console.log("data: " + data?.id);
    this.dialog.open(CrearPreguntaRespuestaComponent, {
      width: '600px',
      data: data
    });
  }

  deletePreguntaRespuesta(id: number, asunto: string): void {
    const dialogRef = this.dialog.open(ModalButtonTemplateComponent, {
      data: {tipoEntidad: 4, idEntidad: id, titulo: "Eliminar pregunta y respuesta", message: "Se eliminará la pregunta y respuesta del asunto " + asunto + ". ¿Continuar?"},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
    });
  }

  openDialog(idEvento: number, tituloEvento: string): void {

    }

  volver(): void {
    this.router.navigate(['/admin']);
  }
}
