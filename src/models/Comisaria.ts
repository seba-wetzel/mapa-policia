// comisaria{
//     jurisdiccion, contacto, autoridades, nombre_anterior, geo_posicion, descripcion}

export interface Comisaria {
    id: string;
    jurisdiccion: string;
    contacto: string;
    autoridades?: string;
    nombre_anterior?: string;
    geo_posicion: string; //hay que definir un tipo Geo
    descripcion: string;
}