export interface HistoricoContratacaoDTO {
    id: string;
    idJogador: string;
    idClubeFutebol: string;
    data_contratacao : string;
    msg_clube : string;
    msg_jogador : string;
    complemento? : string;
    imageUrl? : string;
}