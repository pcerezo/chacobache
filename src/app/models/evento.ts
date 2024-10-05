export class Evento {
    constructor(
        public lugar: string,
        public fecha: Date,
        public descripcion: string,
        public enlace_pdf: string, 
        public enlace_entradas: string,
        public tipo: string,
        public id: number
    ) {}

}