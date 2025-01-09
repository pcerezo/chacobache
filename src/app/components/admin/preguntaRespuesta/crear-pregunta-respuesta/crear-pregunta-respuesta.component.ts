import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { PreguntaRespuestaService } from '../../../../services/pregunta-respuesta.service';
import { PreguntasRespuestas } from '../../../../models/preguntasRespuestas';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventUpdateService } from '../../../../services/event-update.service';

@Component({
  selector: 'app-crear-pregunta-respuesta',
  standalone: true,
  imports: [
    MatCardModule, 
    CommonModule, 
    HttpClientModule, 
    MatInputModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [PreguntaRespuestaService, provideNativeDateAdapter()],
  templateUrl: './crear-pregunta-respuesta.component.html',
  styleUrl: './crear-pregunta-respuesta.component.css'
})
export class CrearPreguntaRespuestaComponent {
  preguntaRespuestaForm!: FormGroup;
  page_title: string = 'Crear Pregunta/Respuesta';

  constructor(
    private fb: FormBuilder,
    private preguntasRespuestasService: PreguntaRespuestaService,
    private router: Router,
    public dialogRef: MatDialogRef<CrearPreguntaRespuestaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventUpdateService: EventUpdateService
  ) {}

  ngOnInit(): void {
    this.preguntaRespuestaForm = this.fb.group({
      id: [this.data.id],
      asunto: [this.data.asunto, Validators.required],
      texto_pregunta: [this.data.texto_pregunta, Validators.required],
      texto_respuesta: [this.data.texto_respuesta, Validators.required],
      fecha_publicacion: [new Date()]
    });
  }

  onSubmit(): void {
    if (this.preguntaRespuestaForm.valid) {
      console.log(this.preguntaRespuestaForm.value);
      const nuevaPreguntaRespuesta: PreguntasRespuestas = this.preguntaRespuestaForm.value;
      if (nuevaPreguntaRespuesta.id == undefined || nuevaPreguntaRespuesta.id == 0) {
        this.preguntasRespuestasService.addPreguntaRespuesta(nuevaPreguntaRespuesta).subscribe(() => {
          this.eventUpdateService.notifyEventUpdated();
          this.dialogRef.close(true);
        });
      }
      else {
        this.preguntasRespuestasService.editPreguntaRespuesta(nuevaPreguntaRespuesta).subscribe(() => {
          this.eventUpdateService.notifyEventUpdated();
          this.dialogRef.close(true);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(true);
    this.router.navigate(['/admin/faq']);
  }

  volver(): void {
    this.dialogRef.close(true);
    this.router.navigate(['/admin']);
  }
}
