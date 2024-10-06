import { Evento } from "./evento";

export class Multimedia {
    constructor(
        public id: number,
        public id_evento: Evento,
        public enlace_contenido: string,
        public descripcion: string
    ) {}
}