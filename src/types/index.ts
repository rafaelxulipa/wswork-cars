export interface Car {
  id: number;
  timestamp_cadastro: number;
  modelo_id: number;
  ano: number;
  combustivel: string;
  num_portas: number;
  cor: string;
  nome_modelo: string;
  valor: number;
  brand?: number;
}

export interface Brand {
  id: number;
  nome: string;
  logo: string;
  cor: string;
}

export interface CarsByBrand {
  [brandId: number]: {
    brand: Brand;
    cars: Car[];
  };
}

export type FuelType = "FLEX" | "GASOLINA" | "DIESEL" | "ELETRICO" | "ETANOL" | "HIBRIDO";

export interface NewCarForm {
  nome_modelo: string;
  brand: number;
  ano: number;
  combustivel: FuelType;
  num_portas: number;
  cor: string;
  valor: number;
}
