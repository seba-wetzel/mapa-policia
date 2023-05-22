import {Cargo} from 'src/models/Cargo';
export interface Persona {
    id: string;
    nombre: string;
    cargo: Cargo;
    fecha_nacimiento?: string;
    fecha_inicio?: string;
    cargo_anterior?: {
        fecha_inicio: string;
        fecha_fin: string;
        cargo: Cargo;
    };
    causas?: string;
    observaciones: string;
    imagen?: [string];
}

