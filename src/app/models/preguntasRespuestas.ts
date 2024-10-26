export class PreguntasRespuestas {
    constructor(
        public id: number,
        public asunto: string,
        public texto_pregunta: string,
        public texto_respuesta: string,
        public fecha_publicacion: Date
    ) {}
}