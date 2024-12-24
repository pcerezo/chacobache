// filepath: /c:/Users/pcere/OneDrive/Documentos/proyectos/Chacobache/src/app/components/admin/articulos/crear-editar-articulo/crear-editar-articulo.component.ts
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { BlogNoticiasService } from '../../../../services/blog-noticias.service';
import { ArticuloBlog } from '../../../../models/articuloBlog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventUpdateService } from '../../../../services/event-update.service';

@Component({
  selector: 'app-editar-articulo',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatOption, MatSelectModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './editar-articulo.component.html',
  styleUrl: './editar-articulo.component.css'
})
export class EditarArticuloComponent {

  articuloForm!: FormGroup;
  articulo: ArticuloBlog;
  id: number = 0;
  page_title: string;

  constructor(
      private fb: FormBuilder, 
      private route: ActivatedRoute, 
      private blogNoticiasService: BlogNoticiasService, 
      private router: Router,
      private eventUpdateService: EventUpdateService) {
    this.page_title = "Editar artículo";
    this.articulo = new ArticuloBlog(0, '', '', '', new Date(), '', '');
    this.route.paramMap.subscribe(params => {
      this.id = + (params.get('id') || 0);
      if (this.id) {
        this.page_title = "Editar artículo";
        this.rellenarArticulo();
      }
    });
  }

  ngOnInit(): void {
    this.articuloForm = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      autor: ['', Validators.required],
      fecha_publicacion: ['', Validators.required],
      tags: [''],
      url_imagen: ['']
    });
  }

  rellenarArticulo() {
    this.blogNoticiasService.getArticuloById(this.id).subscribe((articulo) => {
      if (articulo) {
        this.articulo = articulo;
        this.cargarFormulario();
      }
    });
  }

  cargarFormulario() {
    this.articuloForm.patchValue({
      titulo: this.articulo.titulo,
      contenido: this.articulo.contenido,
      autor: this.articulo.autor,
      fecha_publicacion: this.articulo.fecha_publicacion,
      tags: this.articulo.tags,
      url_imagen: this.articulo.url_imagen
    });
  }

  onSubmit(): void {
    if (this.articuloForm && this.articuloForm.valid) {
      const articuloData = this.articuloForm.value;
      this.blogNoticiasService.actualizarArticulo(this.id, articuloData).subscribe((resultado) => {
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