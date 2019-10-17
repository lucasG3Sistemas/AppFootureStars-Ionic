export interface EmpresarioDTO {
    id : string;
    nome : string;
    cpf : string;
    data_nasc : string;
    nacionalidade : string;
    estado_nasc : string;
    municipio_nasc : string;
    sexo : string;
    prefixo_fone : string;
    ddd_fone : string;
    fone : string;
    complemento? : string;
    idUsuario : string;
    imageUrl? : string;
}