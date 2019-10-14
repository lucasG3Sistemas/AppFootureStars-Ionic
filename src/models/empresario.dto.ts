export interface EmpresarioDTO {
    id : string;
    nome : string;
    prefixo_fone : string;
    ddd_fone : string;
    fone : string;
    email : string;
    complemento? : string;
    idUsuario : string;
    imageUrl? : string;
}