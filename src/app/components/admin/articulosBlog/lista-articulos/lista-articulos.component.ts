import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TruncatePipe } from '../../../../truncate.pipe';
import { BlogNoticiasService } from '../../../../services/blog-noticias.service';
import { EventUpdateService } from '../../../../services/event-update.service';
import { ModalButtonTemplateComponent } from '../../../modals/eliminar-entidad/modal-button-template';

@Component({
  selector: 'app-lista-articulos',
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
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './lista-articulos.component.html',
  styleUrl: './lista-articulos.component.css'
})
export class ListaArticulosComponent implements OnInit {
  articulosFiltrados: any[] = [];
  datosCargados: Boolean;
  searchTerm: string = '';
  page: number;
  offset: number;
  limit: number;
  total!: number;
  readonly dialog = inject(MatDialog);
  
  constructor(
    private blogNoticiasService: BlogNoticiasService,
    private cdr: ChangeDetectorRef,
    private eventUpdateService: EventUpdateService
  ) {
    this.page = 1;
    this.offset = 0;
    this.limit = 5;
    this.datosCargados = false;
    this.getArticulos();
    console.log("En constructor()");
  }

  ngOnInit(): void {
    console.log("En onInit()");
    this.eventUpdateService.eventUpdated$.subscribe(() => {
      this.getArticulos();
    });
  }

  private calcularOffset() {
    this.offset = (this.page - 1) * this.limit;
  }
  
  getArticulos() {
    this.blogNoticiasService.getArticulosPagina(this.offset / this.limit + 1, this.searchTerm).subscribe((lista) => {
      if (lista) {
        this.articulosFiltrados = lista.articulos;
        this.total = lista.total;
        this.datosCargados = true;
        this.cdr.detectChanges();
      }
    });
  }

  filterArticles(): void {
    this.page = 1;
    this.offset = 0;
    this.getArticulos();
  }

  avanzarPagina() {
    this.page = this.page + 1;
    this.calcularOffset();

    this.getArticulos();

    if (this.articulosFiltrados.length == 0) {
      this.page = this.page - 1;
    }
  }

  retrocederPagina() {
    this.page = this.page - 1;
    this.calcularOffset();

    if (this.page < 1) {
      this.page = 1;
    }

    this.getArticulos();
  }

  openDialog(idArticulo: number, tituloArticulo: string): void {
    const dialogRef = this.dialog.open(ModalButtonTemplateComponent, {
      data: {tipoEntidad: 2, idEntidad: idArticulo, titulo: "Eliminar artículo", message: "¿Eliminar el artículo " + tituloArticulo + "?"},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
    });
  }
}