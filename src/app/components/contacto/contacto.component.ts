import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { ContactoService } from '../../services/contacto.service';
import { PreguntasRespuestas } from '../../models/preguntasRespuestas';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [MatCardModule, MatExpansionModule, CommonModule, HttpClientModule, 
    MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule,
    MatCheckboxModule, MatSelectModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  faqs: PreguntasRespuestas[] = [];
  contactForm: FormGroup;
  enviado: Boolean | undefined;
  envioExitoso: Boolean | undefined;
  envioErroneo: Boolean | undefined;
  habilitarEmail: any;
  selected: any;

  constructor(private contactoService: ContactoService, private fb: FormBuilder) {
    this.getPreguntasFrecuentes();

    this.contactForm = this.fb.group({
      nombre : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
      pregunta : new FormControl('', [Validators.required]),
      habilitarEmail : [false],
      asunto: new FormControl('', Validators.required)
    });

    this.contactForm.get('email')?.disable();
  }

  getPreguntasFrecuentes() {
    this.contactoService.getPreguntasFrecuentes().subscribe((respuesta) => {
      this.faqs = respuesta;
      //console.log("Preguntas y respuestas: " +  this.faqs[0]);
    }, 
    (error) => {
      console.error("Error en la obtención de las preguntas frecuentes: " + error);
    });
  }

  get nombre() {
    return this.contactForm.get("nombre");
  }

  get email() {
    return this.contactForm.get("email");
  }

  get pregunta() {
    return this.contactForm.get("pregunta");
  }

  toggleEmailField() {
    if (this.contactForm.get('habilitarEmail')?.value) {
      this.contactForm.get('email')?.enable();
    } else {
      this.contactForm.get('email')?.disable();
    }
  }

  onSubmit() {
    console.log('Formulario enviado:', this.contactForm.value);
    if (this.contactForm.valid) {
      this.contactoService.enviarPregunta(this.contactForm.value).subscribe((resultado) => {
        if (resultado.status == "200") {
          this.envioExitoso = true;
          this.enviado = true;
        }
        else {
          this.envioErroneo = true;
          console.log("(resultado) => envioErroneo");
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
    if (this.envioExitoso) {
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
    this.envioExitoso = undefined;
    this.envioErroneo = undefined;
  }
}
