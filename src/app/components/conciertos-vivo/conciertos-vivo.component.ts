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
  idSelectedVideo: string = '';
  raizVideoYt = "https://www.youtube.com/embed/";

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
    this.tipoSelectedImage = 'imagen';
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

  getVideoByUrlImagen(url: string) {
    var result = url.match('(?<=vi\/)(.*?)(?=\/)');

    return result != null? result[0] : '';
  }

  getThumb(url: string, size: number) {
    var video, results, thumburl;
    var tam;
    
    if (url === null) {
        return '';
    }
    
    results = url.match('[\\?&]v=([^&#]*)');

    if (results === null) {
      return url;
    }
    else {
      video = results[1];
      this.idSelectedVideo = video;

      switch(size) {
        case 0:
        default:
          tam = "default";
          break;
        case 1:
          tam = "hqdefault";
          break;
        case 2:
          tam = "mqdefault";
          break;
        case 3:
          tam = "sddefault";
          break;
        case 4:
          tam = "maxresdefault";
          break;
      }
    
      if(tam != null) {
          thumburl = 'http://img.youtube.com/vi/' + video + '/'+ tam +'.jpg';
      }else{
          thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
      }
    
      return thumburl;
    }
  }
   

  // Function that handles thumbnail click event
  onThumbnailClick(imagen: any): void {
    var enlace: any;
    // Remove the fade-in class, then update the image source
    if (this.selectedImageElement) {
      this.selectedImageElement.nativeElement.classList.remove('show');
    }

    if (imagen.enlace.includes('youtube')) {
      this.tipoSelectedImage = 'video';
      enlace = this.raizVideoYt + this.getVideoByUrlImagen(imagen.enlace);
    }
    else {
      this.tipoSelectedImage = 'imagen';
      enlace = imagen.enlace;
    }

    // Delay the update to synchronize with the fade-out
    setTimeout(() => {
      this.selectedImage = imagen; // Change the image source
      this.selectedImageElement.nativeElement.classList.add('show'); // Fade-in animation
      this.selectedImageElement.nativeElement.alt = imagen.descripcion;
      this.selectedImageElement.nativeElement.src = enlace;
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
            if (multimedia.enlace_contenido.includes('youtube')) {
              multimedia.enlace_contenido = this.getThumb(multimedia.enlace_contenido, 1);
            }
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
