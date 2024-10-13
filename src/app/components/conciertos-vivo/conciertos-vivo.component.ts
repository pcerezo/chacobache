import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Evento } from '../../models/evento';
import { EventsService } from '../../services/events.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MultimediaService } from '../../services/multimedia.service';

@Component({
  selector: 'app-conciertos-vivo',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './conciertos-vivo.component.html',
  styleUrl: './conciertos-vivo.component.css',
  providers: [EventsService, MultimediaService]
})
export class ConciertosVivoComponent {
  // Imagen seleccionada para mostrar en grande
  selectedImage: any = 'https://via.placeholder.com/800x400'; // Imagen por defecto
  tipoSelectedImage: any;
  eventosPasados: any[] = [];

  // Thumbnails para el carousel
  thumbnails: any[] = [];
  

  // ViewChild to manipulate the image element for fade-in effect
  @ViewChild('selectedImageElement', { static: false }) selectedImageElement!: ElementRef<HTMLImageElement>;

  constructor(
    private eventsService: EventsService, 
    private multimediaService: MultimediaService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.getEventosPasadosConMultimedia();
  }

  ngAfterViewInit(): void {
  }

  updateSelectedImageInicial() {
    if (this.selectedImageElement && this.thumbnails.length > 0) {
      this.selectedImageElement.nativeElement.src = this.thumbnails[0].enlace;
      this.selectedImageElement.nativeElement.alt = this.thumbnails[0].descripcion;
      this.selectedImageElement.nativeElement.classList.add('show'); 
    }

    if (this.thumbnails[0] && (this.thumbnails[0].enlace.endsWith('.mp4') || this.thumbnails[0].enlace.includes('youtube'))) {
      this.tipoSelectedImage = 'video';
    }
    else {
      this.tipoSelectedImage = 'imagen';
    }
  }

  // Function that handles thumbnail click event
  onThumbnailClick(imagen: any): void {
    // Remove the fade-in class, then update the image source
    if (this.selectedImageElement) {
      this.selectedImageElement.nativeElement.classList.remove('show');
    }

    if (imagen.enlace.endsWith('.mp4') || imagen.enlace.includes('youtube')) {
      this.tipoSelectedImage = 'video';
    }
    else {
      this.tipoSelectedImage = 'imagen';
    }

    // Delay the update to synchronize with the fade-out
    setTimeout(() => {
      this.selectedImage = imagen; // Change the image source
      this.selectedImageElement.nativeElement.classList.add('show'); // Fade-in animation
      this.selectedImageElement.nativeElement.alt = imagen.descripcion;
      this.selectedImageElement.nativeElement.src = imagen.enlace;
    }, 200);
  }

  getEventosPasadosConMultimedia() {
    this.eventsService.getEventosPasadosConMultimedia().subscribe((eventos) => {
      this.eventosPasados = eventos;

      for (let i = 0; i < this.eventosPasados.length; i++) {
        for (let j = 0; j < this.eventosPasados[i].Multimedia.length; j++) {
          const multimedia = this.eventosPasados[i].Multimedia[j];

          // Determinar si es una imagen o un video en base a la extensión del enlace (por ejemplo)
          let tipo = 'imagen';  // Valor por defecto
          if (multimedia.enlace_contenido.endsWith('.mp4') || multimedia.enlace_contenido.includes('youtube')) {
            tipo = 'video';
          }

          this.thumbnails.push({
            enlace: multimedia.enlace_contenido,
            descripcion: multimedia.descripcion,
            tipo: tipo
          });
        }
      }

      // Forzar la detección de cambios para que Angular actualice el DOM
      this.cdr.detectChanges();

      // Ahora que el array está lleno, se carga la primera imagen.
      this.updateSelectedImageInicial();
    });
  }
  /*
  getMultimediaByEventoId(id_evento: number) {
   this.multimediaService.getMultimediaByEventoId(id_evento).subscribe();
  }*/
}
