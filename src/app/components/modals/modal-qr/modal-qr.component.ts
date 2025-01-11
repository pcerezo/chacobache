import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from 'express';
import { BlogNoticiasService } from '../../../services/blog-noticias.service';
import { EventUpdateService } from '../../../services/event-update.service';
import { EventsService } from '../../../services/events.service';
import { MultimediaService } from '../../../services/multimedia.service';
import { PreguntaRespuestaService } from '../../../services/pregunta-respuesta.service';

@Component({
  selector: 'app-modal-qr',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './modal-qr.component.html',
  styleUrl: './modal-qr.component.css'
})
export class ModalQRComponent {

  constructor(
  ) {}

  ngOnInit() {}
}
