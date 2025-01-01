import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Evento } from '../../models/evento';
import { EventsService } from '../../services/events.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MultimediaService } from '../../services/multimedia.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-conciertos-vivo',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatSelectModule],
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
  @ViewChildren('selectedImageElement') selectedImageElements!: QueryList<ElementRef<HTMLImageElement>>;

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
    if (this.selectedImageElements && this.thumbnails.length > 0) {
      
      const firstThumbnail = this.thumbnails[0];
      let selectedImageElement: ElementRef<HTMLImageElement> | undefined;

      // Usar un bucle for para encontrar el elemento con el ID correspondiente
      for (let i = 0; i < this.selectedImageElements.length; i++) {
        const el = this.selectedImageElements.toArray()[i];
        if (el.nativeElement.id === `selected-image-${firstThumbnail.idEvento}`) {
          selectedImageElement = el;
          break;
        }
      }

      if (selectedImageElement) {
        selectedImageElement.nativeElement.src = firstThumbnail.enlace;
        selectedImageElement.nativeElement.alt = firstThumbnail.descripcion;
        selectedImageElement.nativeElement.classList.add('show'); 
      }

      if (firstThumbnail.enlace.endsWith('.mp4') || firstThumbnail.enlace.includes('youtube')) {
        this.tipoSelectedImage = 'video';
      }
      else {
        this.tipoSelectedImage = 'imagen';
      }
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
  onThumbnailClick(imagen: any, idEvento: number): void {
    var enlace: any;
    let selectedImageElement: ElementRef<HTMLImageElement> | undefined;
    console.log("onThumbnailClick()");
    // Usar un bucle for para encontrar el elemento con el ID correspondiente
    for (let i = 0; i < this.selectedImageElements.length; i++) {
      const el = this.selectedImageElements.toArray()[i];
      console.log("el.nativeElement.id" + el.nativeElement.id);
      if (el.nativeElement.id === `selected-image-${idEvento}`) {
        selectedImageElement = el;
        break;
      }
    }

    if (selectedImageElement) {
      // Remove the fade-in class, then update the image source
      selectedImageElement.nativeElement.classList.remove('show');

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
        selectedImageElement.nativeElement.classList.add('show'); // Fade-in animation
        selectedImageElement.nativeElement.alt = imagen.descripcion;
        selectedImageElement.nativeElement.src = enlace;
      }, 200);
    }
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
            tipo: tipo,
            idEvento: multimedia.id_evento
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
