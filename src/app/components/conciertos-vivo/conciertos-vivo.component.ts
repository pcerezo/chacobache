import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-conciertos-vivo',
  standalone: true,
  imports: [],
  templateUrl: './conciertos-vivo.component.html',
  styleUrl: './conciertos-vivo.component.css'
})
export class ConciertosVivoComponent {
  // Imagen seleccionada para mostrar en grande
  selectedImage: string = 'https://via.placeholder.com/800x400'; // Imagen por defecto

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

  constructor() {}

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
}
