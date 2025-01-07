import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PreguntasRespuestas } from '../../../../models/preguntasRespuestas';
import { PreguntaRespuestaService } from '../../../../services/pregunta-respuesta.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-editar-pregunta-respuesta',
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
  templateUrl: '../crear-pregunta-respuesta/crear-pregunta-respuesta.component.html',
  styleUrl: '../crear-pregunta-respuesta/crear-pregunta-respuesta.component.css'
})
export class EditarPreguntaRespuestaComponent {
preguntaRespuestaForm!: FormGroup;
  page_title: string = 'Actualizar Pregunta/Respuesta';

  constructor(
    private fb: FormBuilder,
    private preguntasRespuestasService: PreguntaRespuestaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.preguntaRespuestaForm = this.fb.group({
      asunto: ['', Validators.required],
      texto_pregunta: ['', Validators.required],
      texto_respuesta: ['', Validators.required],
      fecha_publicacion: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.preguntaRespuestaForm.valid) {
      const nuevaPreguntaRespuesta: PreguntasRespuestas = this.preguntaRespuestaForm.value;
      this.preguntasRespuestasService.addPreguntaRespuesta(nuevaPreguntaRespuesta).subscribe(() => {
        this.router.navigate(['/admin/preguntaRespuesta']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/preguntaRespuesta']);
  }

  volver(): void {
    this.router.navigate(['/admin']);
  }
}
