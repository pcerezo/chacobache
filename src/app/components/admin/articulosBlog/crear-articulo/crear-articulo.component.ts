import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogNoticiasService } from '../../../../services/blog-noticias.service';
import { EventUpdateService } from '../../../../services/event-update.service';
import { ArticuloBlog } from '../../../../models/articuloBlog';

@Component({
  selector: 'app-crear-articulo',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatOption, MatSelectModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: '../editar-articulo/editar-articulo.component.html',
  styleUrl: '../editar-articulo/editar-articulo.component.css'
})
export class CrearArticuloComponent {
  articuloForm!: FormGroup;
  articulo: ArticuloBlog;
  id: number = 0;
  page_title: string;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private blogNoticiasService: BlogNoticiasService, 
    private router: Router,
    private eventUpdateService: EventUpdateService
  ) {
    this.articulo = new ArticuloBlog(0, '', '', '', new Date(), '', '');
    this.page_title = "Crear artículo";
  }

  ngOnInit() {
    this.articuloForm = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      autor: ['', Validators.required],
      fecha_publicacion: ['', Validators.required],
      tags: [''],
      url_imagen: ['']
    });
  }

  onSubmit(): void {
    if (this.articuloForm && this.articuloForm.valid) {
      const articuloData = this.articuloForm.value;
      this.blogNoticiasService.crearArticulo(articuloData).subscribe((resultado) => {
          this.eventUpdateService.notifyEventUpdated();
          console.log('Resultado:', resultado);
      });
    }
    this.router.navigate(['/admin/articulos'], { queryParams: { t: new Date().getTime() } });
  }

  onCancel(): void {
    if (this.articuloForm) {
      this.articuloForm.reset();
    }
  }

  volver() {
    this.router.navigate(['/admin/articulos']);
  }
}
