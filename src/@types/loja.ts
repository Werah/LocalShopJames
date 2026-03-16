export interface Loja{
    id: string;
    nome: string;
    categoria: string;
    imagem: string;
    distancia: string;
    descricao?: string; // 0 '?' indica campo opcional
}