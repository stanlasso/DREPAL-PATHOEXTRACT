import { Role } from "./role.model";

export interface Utilisateur {
    id: number;
    username: string;
    password: string;
    email: string;
    fullname: string;
    nom: string;
    roles: Role[];
    token?: string;
}
