import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { loadLocalCars, saveLocalCars } from "../api";
import { makeCar } from "../../test/factories";

describe("loadLocalCars", () => {
  beforeEach(() => localStorage.clear());

  it("retorna array vazio quando não há dados", () => {
    expect(loadLocalCars()).toEqual([]);
  });

  it("carrega carros salvos", () => {
    const car = makeCar();
    localStorage.setItem("wswork_cars", JSON.stringify([car]));
    expect(loadLocalCars()).toEqual([car]);
  });

  it("retorna array vazio se o JSON for inválido (não lança erro)", () => {
    localStorage.setItem("wswork_cars", "{{invalid}}");
    expect(loadLocalCars()).toEqual([]);
  });
});

describe("saveLocalCars", () => {
  afterEach(() => localStorage.clear());

  it("persiste carros no localStorage", () => {
    const cars = [makeCar({ id: 1 }), makeCar({ id: 2 })];
    saveLocalCars(cars);
    expect(loadLocalCars()).toEqual(cars);
  });

  it("sobrescreve dados anteriores", () => {
    saveLocalCars([makeCar({ id: 1 })]);
    saveLocalCars([makeCar({ id: 2 })]);
    expect(loadLocalCars()).toHaveLength(1);
    expect(loadLocalCars()[0].id).toBe(2);
  });
});

describe("fetchWithFallback (integração simulada)", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("usa fallback local quando a URL remota falha", async () => {
    const { fetchCarsByBrand } = await import("../api");

    const mockFetch = vi.fn()
      .mockRejectedValueOnce(new Error("network error"))
      .mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify({ cars: [makeCar()] }),
      });

    vi.stubGlobal("fetch", mockFetch);

    const result = await fetchCarsByBrand();
    expect(result).toHaveLength(1);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("retorna dados da URL remota quando bem-sucedido", async () => {
    const { fetchCars } = await import("../api");

    const car = makeCar({ id: 99 });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({ cars: [car] }),
    }));

    const result = await fetchCars();
    expect(result[0].id).toBe(99);
  });
});
