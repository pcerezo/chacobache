import { Component, ElementRef, ViewChild } from '@angular/core';
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
  providers: [EventsService]
})
export class ConciertosVivoComponent {
  // Imagen seleccionada para mostrar en grande
  selectedImage: string = 'https://via.placeholder.com/800x400'; // Imagen por defecto
  eventosPasados: Evento[] = [];

  // Thumbnails para el carousel
  thumbnails = [
    { src: 'https://via.placeholder.com/150', fullImage: 'https://via.placeholder.com/800x400' },
    { src: 'https://via.placeholder.com/150/111', fullImage: 'https://via.placeholder.com/800x400/111' },
    { src: 'https://via.placeholder.com/150/222', fullImage: 'https://via.placeholder.com/800x400/222' },
    { src: 'https://via.placeholder.com/150/333', fullImage: 'https://via.placeholder.com/800x400/333' },
    { src: 'https://via.placeholder.com/150/444', fullImage: 'https://via.placeholder.com/800x400/444' },
    { src: 'https://via.placeholder.com/150/555', fullImage: 'https://via.placeholder.com/800x400/555' }
  ];

  // ViewChild to manipulate the image element for fade-in effect
  @ViewChild('selectedImageElement', { static: true }) selectedImageElement!: ElementRef<HTMLImageElement>;

  constructor(
    private eventsService: EventsService, 
    private multimediaService: MultimediaService) {
    this.getEventosPasadosConMultimedia();
  }

  ngAfterViewInit(): void {
    // Optionally, manipulate the DOM after the view is initialized if necessary
  }

  // Function that handles thumbnail click event
  onThumbnailClick(fullImage: string): void {
    // Remove the fade-in class, then update the image source
    this.selectedImageElement.nativeElement.classList.remove('show');

    // Delay the update to synchronize with the fade-out
    setTimeout(() => {
      this.selectedImage = fullImage; // Change the image source
      this.selectedImageElement.nativeElement.classList.add('show'); // Fade-in animation
    }, 200);
  }

  getEventosPasadosConMultimedia() {
    this.eventsService.getEventosPasados().subscribe((eventos) => {
      this.eventosPasados = eventos;
    });
  }

  getMultimediaByEventoId(id_evento: number) {
   //this.multimediaService.getMultimediaByEventoId(id_evento).subscribe();
  }
}
