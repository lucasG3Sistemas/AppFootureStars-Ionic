export interface JogadorDTO {
    id : string;
    nome : string;
    altura : string;
    peso : string;
    profissionalizacao : string;
    codigo_cbf : string;
    prefixo_fone : string;
    ddd_fone : string;
    fone : string;
    email : string;
    complemento? : string;
    idClubeFutebol : string;
    idEmpresario : string;
    idUsuario : string;
    imageUrl? : string;
}