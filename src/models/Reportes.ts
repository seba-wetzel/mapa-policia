// reportes{
//     link}
//     caso{
//     ubicacion, tipo_de_caso, descripcion, victima,{edad, nombre} victimario(persona), informacion, fecha}

import {Caso} from 'src/models/Caso';

export interface Reportes {
    id: string;
    link: string;
    caso: Caso;
}