import { describe, it, expect } from "vitest";
import { formatCurrency, formatDate, getCorStyle } from "../format";

describe("formatCurrency", () => {
  it("formata valores em reais", () => {
    const result = formatCurrency(50000);
    expect(result).toContain("50");
    expect(result).toContain("R$");
  });

  it("formata zero corretamente", () => {
    expect(formatCurrency(0)).toContain("0");
  });
});

describe("formatDate", () => {
  it("formata timestamp em data pt-BR", () => {
    const result = formatDate(1696539488);
    expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });

  it("corrige timestamps em milissegundos (13 dígitos)", () => {
    const ts = 16965354321;
    const result = formatDate(ts);
    expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });
});

describe("getCorStyle", () => {
  it("retorna hex correto para cor conhecida", () => {
    expect(getCorStyle("AZUL").bg).toBe("#2563eb");
    expect(getCorStyle("BRANCA").bg).toBe("#FFFFFF");
  });

  it("indica borda para cores claras", () => {
    expect(getCorStyle("BRANCA").border).toBe(true);
    expect(getCorStyle("PRETO").border).toBe(false);
  });

  it("retorna fallback para cor desconhecida", () => {
    expect(getCorStyle("ROXO_INEXISTENTE").bg).toBe("#94a3b8");
  });

  it("é case-insensitive", () => {
    expect(getCorStyle("azul").bg).toBe(getCorStyle("AZUL").bg);
  });
});
