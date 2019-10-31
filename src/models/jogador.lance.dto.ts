import { JogadorDTO } from "./jogador.dto";

export interface JogadorLancesDTO {
    id: string;
    titulo: string;
    urlVideo: string;
    descricao: string;
    complemento: string;
    idJogador?: string;
    idUsuario?: string;
}