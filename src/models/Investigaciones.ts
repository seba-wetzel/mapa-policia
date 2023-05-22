// investigaciones{
//     titulo, texto, fecha, destacados, autores, imagenes}
//     autores{
//     datos}
import {Autor} from 'src/models/Autor';
export interface Investigaciones {
    id: string;
    titulo: string;
    texto: string;
    fecha: string;
    destacados: string;
    autores: [Autor];
    imagenes: [string];
}