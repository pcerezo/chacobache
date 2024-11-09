import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogNoticiasService } from '../../services/blog-noticias.service';
import { ArticuloBlog } from '../../models/articuloBlog';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-detalles-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [],
  templateUrl: './detalles-blog.component.html',
  styleUrl: './detalles-blog.component.css'
})
export class DetallesBlogComponent {

  id: number = 0;
  articulo: ArticuloBlog | undefined;
  contenidoArray: string[] = [];
  etiquetasArray: string[] = [];
  /*
  articulo = {
    titulo: 'La Historia de Chacobache',
    imagenPortada: 'https://via.placeholder.com/800x400',
    autor: 'Coba',
    cuerpo: [
      'Chacobache es una agrupación musical conocida por su innovadora mezcla de estilos.',
      'El grupo ha recorrido varias ciudades, presentando un espectáculo único que combina el folklore con ritmos modernos.',
      'Cada miembro aporta su talento individual, creando una armonía única que ha cautivado a miles de espectadores.'
    ],
    fecha: new Date(2023, 10, 5),
    etiquetas: ['música', 'concierto', 'folklore']
  };
  */

  constructor(
    private route: ActivatedRoute, 
    private blogNoticiasService: BlogNoticiasService,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = + (params.get('id') || 0);
    });

    this.getArticuloBlogById();
  }

  getArticuloBlogById() {
    this.blogNoticiasService.getArticuloById(this.id).subscribe((res) => {
      if (res) {
        console.log("Respuesta: " + res);
        this.articulo = res;
        // Divide el contenido en párrafos usando un delimitador adecuado, como '\n\n' 
        this.contenidoArray = this.articulo.contenido.split('\n\n'); 
        this.etiquetasArray = this.articulo.tags.split(',');
      }
    });
  }

  volverBlogNoticias() {
    this.router.navigate(['/blogNoticias']);
  }
}
