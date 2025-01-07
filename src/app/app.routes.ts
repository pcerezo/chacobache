import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { IntegrantesComponent } from './components/integrantes/integrantes.component';
import { EventsComponent } from './components/events/events.component';
import { ConciertosVivoComponent } from './components/conciertos-vivo/conciertos-vivo.component';
import { OtrasProduccionesComponent } from './components/otras-producciones/otras-producciones.component';
import { BlogNoticiasComponent } from './components/blog-noticias/blog-noticias.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { DetallesBlogComponent } from './components/detalles-blog/detalles-blog.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './authGuard';
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { ListaEventosComponent } from './components/admin/eventos/lista-eventos/lista-eventos.component';
import { CrearEventoComponent } from './components/admin/eventos/crear-evento/crear-evento.component';
import { EditarEventoComponent } from './components/admin/eventos/editar-evento/editar-evento.component';
import { BorrarEventoComponent } from './components/admin/eventos/borrar-evento/borrar-evento.component';
import { ListaArticulosComponent } from './components/admin/articulosBlog/lista-articulos/lista-articulos.component';
import { CrearArticuloComponent } from './components/admin/articulosBlog/crear-articulo/crear-articulo.component';
import { EditarArticuloComponent } from './components/admin/articulosBlog/editar-articulo/editar-articulo.component';
import { Error404Component } from './components/error404/error404.component';
import { EditarMultimediaComponent } from './components/admin/multimedia/editar-multimedia/editar-multimedia.component';
import { ListaMultimediaComponent } from './components/admin/multimedia/lista-multimedia/lista-multimedia.component';
import { CrearEditarMultimediaModalComponent } from './components/admin/multimedia/crear-editar-multimedia-modal/crear-editar-multimedia-modal.component';
import { ListaPreguntaRespuestaComponent } from './components/admin/preguntaRespuesta/lista-pregunta-respuesta/lista-pregunta-respuesta.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: '', redirectTo: '/inicio', pathMatch: 'full' },
    {path: 'integrantes', component: IntegrantesComponent},
    {path: 'eventos', component: EventsComponent},
    {path: 'conciertosEnVivo', component: ConciertosVivoComponent},
    {path: 'otrasProducciones', component: OtrasProduccionesComponent},
    {path: 'blogNoticias', component: BlogNoticiasComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'blogNoticias/detalles/:id', component: DetallesBlogComponent},
    {path: 'login', component: LoginComponent},

    {path: 'admin', component: AdminMainComponent, canActivate: [AuthGuard]},
    {path: 'admin/eventos', component: ListaEventosComponent, canActivate: [AuthGuard]},
    {path: 'admin/eventos/crearEvento', component: CrearEventoComponent, canActivate: [AuthGuard]},
    {path: 'admin/eventos/editarEvento/:id', component: EditarEventoComponent, canActivate: [AuthGuard]},
    {path: 'admin/eventos/eliminarEvento/:id', component: BorrarEventoComponent, canActivate: [AuthGuard]},
    {path: 'admin/articulos', component: ListaArticulosComponent, canActivate: [AuthGuard]},
    {path: 'admin/articulos/crearArticulo', component: CrearArticuloComponent, canActivate: [AuthGuard]},
    {path: 'admin/articulos/editarArticulo/:id', component: EditarArticuloComponent, canActivate: [AuthGuard]},
    {path: 'admin/multimedia/editarMultimedia/:id', component: EditarMultimediaComponent, canActivate: [AuthGuard]},
    {path: 'admin/multimedia', component: ListaMultimediaComponent, canActivate: [AuthGuard]},
    {path: 'admin/multimedia/crearMultimedia', component: CrearEditarMultimediaModalComponent, canActivate: [AuthGuard]},
    {path: 'admin/multimedia/editarMultimedia/:id', component: EditarMultimediaComponent, canActivate: [AuthGuard]},
    {path: 'admin/faq', component: ListaPreguntaRespuestaComponent, canActivate: [AuthGuard]},
    
    {path: '**', component: Error404Component }
];
