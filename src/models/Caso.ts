//     caso{
//     ubicacion, tipo_de_caso, descripcion, victima,{edad, nombre} victimario(persona), informacion, fecha}
import {Persona} from 'src/models/Persona';

export interface Caso {
    id: string;
    ubicacion: string;
    tipo_de_caso: string;
    descripcion: string;
    victima: {
        edad: number;
        nombre: string;
    };
    victimario: Persona;
    informacion: string;
    fecha: string;
}