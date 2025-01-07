import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
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
