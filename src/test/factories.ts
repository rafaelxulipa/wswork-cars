import type { Car, Brand } from "../types";

export function makeCar(overrides: Partial<Car> = {}): Car {
  return {
    id: 1,
    timestamp_cadastro: 1696539488,
    modelo_id: 12,
    ano: 2022,
    combustivel: "FLEX",
    num_portas: 4,
    cor: "PRATA",
    nome_modelo: "COROLLA",
    valor: 150000,
    brand: 1,
    ...overrides,
  };
}

export function makeBrand(overrides: Partial<Brand> = {}): Brand {
  return {
    id: 1,
    nome: "Toyota",
    logo: "🚗",
    cor: "#EB0A1E",
    ...overrides,
  };
}
