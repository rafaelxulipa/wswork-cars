import { describe, it, expect } from "vitest";
import { inferBrand, getBrand, BRANDS } from "../brands";

describe("inferBrand", () => {
  it("retorna brand correto para modelo exato", () => {
    expect(inferBrand("COROLLA")).toBe(1);
    expect(inferBrand("ONIX PLUS")).toBe(3);
    expect(inferBrand("JETTA")).toBe(2);
  });

  it("é case-insensitive", () => {
    expect(inferBrand("corolla")).toBe(1);
    expect(inferBrand("Corolla")).toBe(1);
  });

  it("retorna 0 para modelo desconhecido", () => {
    expect(inferBrand("MODELO_INEXISTENTE_XYZ")).toBe(0);
  });

  it("infere por substring", () => {
    expect(inferBrand("HILLUX SW4 TURBO")).toBe(1);
  });
});

describe("getBrand", () => {
  it("retorna brand pelo id", () => {
    const brand = getBrand(1);
    expect(brand.nome).toBe("Toyota");
  });

  it("retorna 'Outras Marcas' para id desconhecido", () => {
    const brand = getBrand(9999);
    expect(brand.id).toBe(0);
    expect(brand.nome).toBe("Outras Marcas");
  });
});

describe("BRANDS", () => {
  it("contém as marcas principais", () => {
    const nomes = Object.values(BRANDS).map((b) => b.nome);
    expect(nomes).toContain("Toyota");
    expect(nomes).toContain("Volkswagen");
    expect(nomes).toContain("Chevrolet");
  });

  it("cada marca tem cor válida em hex", () => {
    Object.values(BRANDS).forEach((b) => {
      expect(b.cor).toMatch(/^#[0-9A-Fa-f]{3,6}$/);
    });
  });
});
