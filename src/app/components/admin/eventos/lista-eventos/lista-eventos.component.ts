import { ChangeDetectorRef, Component, DoCheck, inject, OnInit } from '@angular/core';
import { EventsService } from '../../../../services/events.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TruncatePipe } from '../../../../truncate.pipe';
import { RouterLink } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalButtonTemplateComponent } from '../../../modals/eliminar-entidad/modal-button-template';
import { EventUpdateService } from '../../../../services/event-update.service';

@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [
    MatCardModule, 
    CommonModule, 
    HttpClientModule, 
    MatInputModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    ReactiveFormsModule, 
    TruncatePipe, 
    RouterLink,
    ],
  templateUrl: './lista-eventos.component.html',
  styleUrl: '../../../events/events.component.css'
})
export class ListaEventosComponent implements OnInit{
  listaEventos: any[] = [];
  datosCargados: Boolean;
  readonly dialog = inject(MatDialog);
  contador: number;
  limite: number;
  
  constructor(
    private eventosService: EventsService,
    private cdr: ChangeDetectorRef,
    private eventUpdateService: EventUpdateService
  ) {
    this.datosCargados = false;
    this.contador = 0;
    this.limite = 5;
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



  openDialog(idEvento: number, tituloEvento: string): void {
    const dialogRef = this.dialog.open(ModalButtonTemplateComponent, {
      data: {tipoEntidad: 1, idEntidad: idEvento, titulo: "Eliminar evento", message: "¿Eliminar el evento " + tituloEvento + "?"},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
    });
  }

}
