import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatOption, MatSelectModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css'
})
export class EditarEventoComponent {

  eventoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
    if (this.eventoForm.valid) {
      const eventoData = this.eventoForm.value;
      console.log('Evento guardado:', eventoData);
      // Aquí puedes agregar el código para enviar los datos al backend
    }
  }

  onCancel(): void {
    this.eventoForm.reset();
  }
}
