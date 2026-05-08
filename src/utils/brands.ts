import type { Brand } from "../types";

export const BRANDS: Record<number, Brand> = {
  1: { id: 1, nome: "Toyota", logo: "🚗", cor: "#EB0A1E" },
  2: { id: 2, nome: "Volkswagen", logo: "🚙", cor: "#001E50" },
  3: { id: 3, nome: "Chevrolet", logo: "🏎️", cor: "#CC0000" },
  4: { id: 4, nome: "Ford", logo: "🚘", cor: "#003478" },
  5: { id: 5, nome: "Fiat", logo: "🚕", cor: "#8B0000" },
  6: { id: 6, nome: "Honda", logo: "🚐", cor: "#CC0000" },
  7: { id: 7, nome: "Hyundai", logo: "🛻", cor: "#002C5F" },
  8: { id: 8, nome: "Renault", logo: "🚌", cor: "#EFDF00" },
  0: { id: 0, nome: "Outras Marcas", logo: "🚗", cor: "#64748b" },
};

const MODEL_BRAND_MAP: Record<string, number> = {
  "ONIX": 3, "ONIX PLUS": 3, "CRUZE": 3, "TRACKER": 3, "S10": 3,
  "JETTA": 2, "GOL": 2, "POLO": 2, "GOLF": 2, "TIGUAN": 2, "SAVEIRO": 2,
  "COROLLA": 1, "ETIOS": 1, "HILLUX": 1, "HILLUX SW4": 1, "YARIS": 1, "RAV4": 1,
  "FIESTA": 4, "FOCUS": 4, "RANGER": 4, "ECOSPORT": 4,
  "UNO": 5, "PALIO": 5, "STRADA": 5, "TORO": 5, "CRONOS": 5,
  "CIVIC": 6, "FIT": 6, "HRV": 6, "CRV": 6,
  "HB20": 7, "CRETA": 7, "TUCSON": 7,
  "SANDERO": 8, "DUSTER": 8, "KWID": 8, "LOGAN": 8,
};

export function inferBrand(nomeModelo: string): number {
  const upper = nomeModelo.toUpperCase().trim();
  if (MODEL_BRAND_MAP[upper] !== undefined) return MODEL_BRAND_MAP[upper];
  for (const [key, brandId] of Object.entries(MODEL_BRAND_MAP)) {
    if (upper.includes(key)) return brandId;
  }
  return 0;
}

export function getBrand(id: number): Brand {
  return BRANDS[id] ?? BRANDS[0];
}
