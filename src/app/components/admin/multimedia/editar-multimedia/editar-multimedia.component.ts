// filepath: /c:/Users/pcere/OneDrive/Documentos/proyectos/Chacobache/src/app/components/admin/multimedia/editar-multimedia/editar-multimedia.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MultimediaService } from '../../../../services/multimedia.service';
import { EventsService } from '../../../../services/events.service';
import { EventUpdateService } from '../../../../services/event-update.service';
import { Multimedia } from '../../../../models/multimedia';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Evento } from '../../../../models/evento';
import { TruncatePipe } from '../../../../truncate.pipe';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CrearEditarMultimediaModalComponent } from '../crear-editar-multimedia-modal/crear-editar-multimedia-modal.component';

@Component({
  selector: 'app-editar-multimedia',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatSelectModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './editar-multimedia.component.html',
  styleUrl: './editar-multimedia.component.css'
})
export class EditarMultimediaComponent implements OnInit {

  selectedImage: any = 'https://via.placeholder.com/800x400'; // Imagen por defecto
  multimediaForm!: FormGroup;
  listaMultimedia: any[] = [];
  multimedia: Multimedia;
  evento!: Evento;
  tipoSelectedImage: any;
  id: number = 0;
  page_title: string;
  raizVideoYt = "https://www.youtube.com/embed/";
  idSelectedVideo: string = '';
  thumbnails: any[] = [];

   @ViewChild('selectedImageElement', { static: false }) selectedImageElement!: ElementRef<HTMLImageElement>;
   
  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private multimediaService: MultimediaService, 
    private eventsService: EventsService,
    private router: Router,
    private eventUpdateService: EventUpdateService,
    private dialog: MatDialog
    ) {
    this.page_title = "Crear contenido multimedia";
    this.evento = {lugar: '', fecha: new Date(), descripcion: '', enlace_pdf: '', enlace_entradas: '', tipo: '', id: 0};
    this.multimedia = new Multimedia(0, { id: 0, lugar: '', fecha: new Date(), descripcion: '', enlace_pdf: '', enlace_entradas: '', tipo: '' }, '', '');
    this.route.paramMap.subscribe(params => {
      this.id = + (params.get('id') || 0);
      if (this.id) {
        this.page_title = "Editar contenido multimedia";
        this.cargarEvento(this.id);
        this.rellenarMultimedia();
      }
    });
  }

  ngOnInit(): void {
    this.tipoSelectedImage = 'imagen';
    this.multimediaForm = this.fb.group({
      id_evento: ['', Validators.required],
      enlace_contenido: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this.cargarEvento(this.id);
  }

  cargarEvento(idEvento: number) {
    this.eventsService.getEventoDetalles(idEvento).subscribe((eventoResp) => {
      this.evento = eventoResp;
    });
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

  onThumbnailClick(imagen: any): void {
    const dialogRef = this.dialog.open(CrearEditarMultimediaModalComponent, {
      width: '600px',
      data: {
        id_evento: imagen.idEvento,
        enlace_contenido: imagen.enlace,
        descripcion: imagen.descripcion
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if needed
      }
    });

    /*var enlace: any;
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
    }, 200);*/
  }

  getVideoByUrlImagen(url: string) {
    var result = url.match('(?<=vi\/)(.*?)(?=\/)');

    return result != null? result[0] : '';
  }

  rellenarMultimedia() {
    this.multimediaService.getMultimediaByEventoId(this.id).subscribe((multimediaResp) => {
      if (multimediaResp) {
        this.listaMultimedia = multimediaResp;

        for (let j = 0; j < this.listaMultimedia.length; j++) {
          const multimedia = this.listaMultimedia[j];

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
    });
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

  cargarFormulario(idMultimedia: number) {
    this.multimediaService.getMultimediaById(idMultimedia).subscribe((multimediaResp) => {
      this.multimedia = multimediaResp;

      this.multimediaForm.patchValue({
        id_evento: this.multimedia.id_evento.id,
        enlace_contenido: this.multimedia.enlace_contenido,
        descripcion: this.multimedia.descripcion
      });
    });
  }

  onSubmit(): void {
    if (this.multimediaForm && this.multimediaForm.valid) {
      const multimediaData = this.multimediaForm.value;
      if (this.id) {
        this.multimediaService.actualizarMultimedia(this.id, multimediaData).subscribe((resultado) => {
          this.eventUpdateService.notifyEventUpdated();
          console.log('Resultado:', resultado);
        });
      } else {
        this.multimediaService.crearMultimedia(multimediaData).subscribe((resultado) => {
          this.eventUpdateService.notifyEventUpdated();
          console.log('Resultado:', resultado);
        });
      }
      this.router.navigate(['/admin/multimedia'], { queryParams: { t: new Date().getTime() } });
    }
  }

  onCancel(): void {
    if (this.multimediaForm) {
      this.multimediaForm.reset();
    }
  }

  volver() {}

  addMultimedia() {
    this.router.navigate(['/admin/multimedia/crearMultimedia']);
  }

  editMultimedia(id: number) {
    this.router.navigate(['/admin/multimedia/editarMultimedia', id]);
  }
}