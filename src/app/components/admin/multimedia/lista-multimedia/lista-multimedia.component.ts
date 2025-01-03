import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../../../truncate.pipe';
import { EventsService } from '../../../../services/events.service';
import { EventUpdateService } from '../../../../services/event-update.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearEditarMultimediaModalComponent } from '../crear-editar-multimedia-modal/crear-editar-multimedia-modal.component';

@Component({
  selector: 'app-lista-multimedia',
  standalone: true,
  imports: [MatCardModule, 
    CommonModule, 
    HttpClientModule, 
    MatInputModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    ReactiveFormsModule,
    TruncatePipe,
    RouterLink],
  templateUrl: './lista-multimedia.component.html',
  styleUrl: './lista-multimedia.component.css'
})
export class ListaMultimediaComponent {
  listaEventos: any[] = [];
  datosCargados: Boolean;
  readonly dialog = inject(MatDialog);
  
  constructor(
    private eventosService: EventsService,
    private cdr: ChangeDetectorRef,
    private eventUpdateService: EventUpdateService
  ) {
    this.datosCargados = false;
    this.getEventos();
    console.log("En constructor()");
  }

  ngOnInit(): void {
    console.log("En onInit()");
    this.eventUpdateService.eventUpdated$.subscribe(() => {
      this.getEventos();
    });
  }
  
  getEventos() {
    this.eventosService.getAllEventos().subscribe((lista) => {
      if (lista) {
        this.listaEventos = lista;
        this.datosCargados = true;
        this.cdr.detectChanges();
      }
    });
  }

  addMultimedia() {
    this.dialog.open(CrearEditarMultimediaModalComponent, {
      width: '600px',
      data: {id: 0}
    });
  }
}
