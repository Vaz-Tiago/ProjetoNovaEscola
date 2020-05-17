import IClientResponseDTO from './IClientResponseDTO';

export default interface IClientListResponseDTO {
  total: number;
  lista: IClientResponseDTO[];
}
