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

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [MatCardModule, MatExpansionModule, CommonModule, HttpClientModule, MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  faqs: PreguntasRespuestas[] = [];
  contactForm: FormGroup;
  enviado: Boolean | undefined;

  constructor(private contactoService: ContactoService, private fb: FormBuilder) {
    this.getPreguntasFrecuentes();

    this.contactForm = this.fb.group({
      nombre : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
      pregunta : new FormControl ('', [Validators.required])
    });
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

  onSubmit() {}
}
