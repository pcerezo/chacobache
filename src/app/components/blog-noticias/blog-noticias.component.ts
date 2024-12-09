import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgControl, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BlogNoticiasService } from '../../services/blog-noticias.service';
import { RouterLink } from '@angular/router';
import { ArticuloBlog } from '../../models/articuloBlog';
import { TruncatePipe } from '../../truncate.pipe';

@Component({
  selector: 'app-blog-noticias',
  standalone: true,
  imports: [MatCardModule, CommonModule, HttpClientModule, MatInputModule, MatButtonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule,
    RouterLink, TruncatePipe
  ],
  providers: [],
  templateUrl: './blog-noticias.component.html',
  styleUrl: './blog-noticias.component.css'
})
export class BlogNoticiasComponent {
  articulos: ArticuloBlog[] = [];
  articulosFiltrados: ArticuloBlog[] = [];
  searchTerm: string = '';
  page: number;
  total!: number;
  offset: number;
  limit: number;

  constructor(private blogNoticiasService: BlogNoticiasService) {
    this.page = 1;
    this.offset = 0;
    this.limit = 2;
    this.getArticulos();
  }

  private calcularOffset() {
    this.offset = (this.page - 1) * this.limit;
  }

  getArticulos() {
    this.blogNoticiasService.getArticulosPagina(this.page, this.searchTerm).subscribe((respuesta) => {
      this.total = respuesta.total;
      this.articulos = respuesta.articulos;
      this.articulosFiltrados = this.articulos;
    }, 
    (error) => {
      console.error("Error en la obtención de los artículos del blog: " + error);
    });
  }

  avanzarPagina() {
    this.page = this.page + 1;
    this.calcularOffset();

    this.getArticulos();

    if (this.articulosFiltrados.length == 0) {
      this.page = this.page - 1;
    }
  }

  retrocederPagina() {
    this.page = this.page - 1;
    this.calcularOffset();

    if (this.page < 1) {
      this.page = 1;
    }

    this.getArticulos();
  }

  filterArticles(): void {
    this.page = 1;
    this.offset = 0;
    this.getArticulos();
  }

  /*
  filterArticles(): void {
    const term = this.searchTerm.toLowerCase();

    this.articulosFiltrados = this.articulos.filter(articulo =>
      articulo.titulo.toLowerCase().includes(term) ||
      articulo.contenido.toLowerCase().includes(term) ||
      articulo.tags.split(",").some((tag: string) => tag.toLowerCase().includes(term))
    );

    console.log("busqueda: " + term);
    console.log("Artículos filtrados: " + this.articulosFiltrados.at(0)?.titulo);
  }
  */
}
