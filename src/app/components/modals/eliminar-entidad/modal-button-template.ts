import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { EventsService } from '../../../services/events.service';
import { BlogNoticiasService } from '../../../services/blog-noticias.service';
import { MultimediaService } from '../../../services/multimedia.service';
import { ContactoService } from '../../../services/contacto.service';
import { Router } from '@angular/router';
import { ListaEventosComponent } from '../../admin/eventos/lista-eventos/lista-eventos.component';
import { EventUpdateService } from '../../../services/event-update.service';

@Component({
  selector: 'app-modal-button-template',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  providers: [],
  templateUrl: './modal-button-template.component.html',
  styleUrl: './modal-button-template.css'
})
export class ModalButtonTemplateComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { tipoEntidad: number, idEntidad: number, titulo: string, message: string },
    private eventsService: EventsService,
    private blogNoticiasService: BlogNoticiasService,
    private multimediaService: MultimediaService,
    private contactoService: ContactoService,
    private router: Router,
    private eventUpdateService: EventUpdateService,
    ) {}

  aceptar() {
    if (this.data.tipoEntidad) {
      switch(this.data.tipoEntidad){
        case 1:
          console.log("Voy a eliminar evento")
          this.eventsService.eliminarEvento(this.data.idEntidad).subscribe((res) => {
            this.eventUpdateService.notifyEventUpdated();
            console.log("Resultado: " + res.message);
          });
          this.router.navigate(['/admin/eventos'], { queryParams: { t: new Date().getTime() } });
          console.log("Después de eliminar evento");
          break;
        case 2:
          this.blogNoticiasService.eliminarArticulo(this.data.idEntidad).subscribe((res) => {
            this.eventUpdateService.notifyEventUpdated();
            console.log("Resultado: " + res.message);
          });
          console.log("Eliminar artículo");
          break;
        case 3:
          this.multimediaService.eliminarMultimedia(this.data.idEntidad);
          console.log("Eliminar multimedia");
          break;
        case 4:
          this.contactoService.eliminarPreguntaYRespuesta(this.data.idEntidad);
          console.log("Eliminar preguntaYRespuesta");
          break;
      }
    }
  }
}
