export interface JogadorDTO {
    id : string;
    nome : string;
    cpf : string;
    data_nasc : string;
    nacionalidade : string;
    estado_nasc : string;
    municipio_nasc : string;
    sexo : string;
    altura : string;
    peso : string;
    profissionalizacao : string;
    codigo_cbf : string;
    idModalidade : string;
    idPosicao1 : string;
    idPosicao2 : string;
    idPosicao3 : string;
    perna_preferida : string;
    prefixo_fone : string;
    ddd_fone : string;
    fone : string;
    email : string;
    complemento? : string;
    idClubeFutebol? : string;
    idEmpresario? : string;
    idUsuario? : string;
    imageUrl? : string;
}