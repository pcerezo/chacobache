export class ArticuloBlog {
    constructor(
        public id: number,
        public titulo: string,
        public contenido: string,
        public autor: string,
        public fecha_publicacion: Date,
        public tags: string,
        public url_imagen: string
    ){}
}