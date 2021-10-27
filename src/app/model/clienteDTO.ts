export class ClienteDTO {
    ruc?: number;
    dv?: number;
    direccion?: string;
    razonSocial?: string;

    constructor(data: any) {
        this.ruc = data.ruc;
        this.dv = data.dv;
        this.direccion = data.direccion;
        this.razonSocial = data.razonSocial;
    }
}