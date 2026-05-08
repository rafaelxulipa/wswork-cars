export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatDate(timestamp: number): string {
  const ts = timestamp > 9999999999 ? Math.floor(timestamp / 1000) : timestamp;
  return new Intl.DateTimeFormat("pt-BR").format(new Date(ts * 1000));
}

export const COR_MAP: Record<string, string> = {
  BRANCA: "#FFFFFF",
  PRETA: "#1a1a1a",
  PRETO: "#1a1a1a",
  AZUL: "#2563eb",
  VERMELHA: "#dc2626",
  VERMELHO: "#dc2626",
  PRATA: "#94a3b8",
  CINZA: "#6b7280",
  BEGE: "#d4b896",
  AMARELA: "#facc15",
  AMARELO: "#facc15",
  VERDE: "#16a34a",
  MARROM: "#92400e",
  LARANJA: "#ea580c",
  DOURADA: "#ca8a04",
  DOURADO: "#ca8a04",
  VINHO: "#881337",
};

export function getCorStyle(cor: string): { bg: string; border: boolean } {
  const hex = COR_MAP[cor.toUpperCase()] ?? "#94a3b8";
  const light = ["#FFFFFF", "#d4b896", "#facc15"].includes(hex);
  return { bg: hex, border: light };
}

export const FUEL_LABELS: Record<string, string> = {
  FLEX: "Flex",
  GASOLINA: "Gasolina",
  DIESEL: "Diesel",
  ELETRICO: "Elétrico",
  ETANOL: "Etanol",
  HIBRIDO: "Híbrido",
};
