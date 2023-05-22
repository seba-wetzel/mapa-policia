import {Persona} from 'src/models/Persona';

export interface Instituciones {
    id: string;
    nombre: string;
    descripcion: string;
    responsable: Persona;
    autoridad_superior: string;
    subordinados: string;
    imagen?: [string];
}